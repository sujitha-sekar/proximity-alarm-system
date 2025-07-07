import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

export interface ProximityData {
  distance: number;
  personDetected: boolean;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProximityAlarmService {
  private apiUrl = 'http://localhost:3000/api';
  private alarmSound: HTMLAudioElement;
  private isAlarmActive = false;
  private detectionSubject = new BehaviorSubject<ProximityData | null>(null);
  private monitoringInterval: any;
  
  public detection$ = this.detectionSubject.asObservable();
  public isMonitoring = false;
  
  constructor(private http: HttpClient) {
    this.alarmSound = new Audio('assets/alarm.mp3');
    this.alarmSound.loop = true;
    this.alarmSound.volume = 0.8;
  }
  
  startMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.monitoringInterval = interval(1000).pipe(
      switchMap(() => this.checkProximity()),
      catchError(error => {
        console.error('Proximity check error:', error);
        return [];
      })
    ).subscribe(data => {
      this.detectionSubject.next(data);
      this.handleProximityData(data);
    });
  }
  
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      this.monitoringInterval.unsubscribe();
      this.monitoringInterval = null;
    }
    this.isMonitoring = false;
    this.stopAlarm();
  }
  
  private checkProximity(): Observable<ProximityData> {
    return this.http.get<ProximityData>(`${this.apiUrl}/proximity`);
  }
  
  private handleProximityData(data: ProximityData): void {
    if (data.personDetected && data.distance <= 10) {
      this.triggerAlarm();
    } else {
      this.stopAlarm();
    }
  }
  
  private triggerAlarm(): void {
    if (!this.isAlarmActive) {
      this.isAlarmActive = true;
      this.alarmSound.play().catch(error => {
        console.error('Could not play alarm sound:', error);
      });
    }
  }
  
  private stopAlarm(): void {
    if (this.isAlarmActive) {
      this.isAlarmActive = false;
      this.alarmSound.pause();
      this.alarmSound.currentTime = 0;
    }
  }
  
  setAlarmVolume(volume: number): void {
    this.alarmSound.volume = Math.max(0, Math.min(1, volume));
  }
  
  getAlarmStatus(): boolean {
    return this.isAlarmActive;
  }
}