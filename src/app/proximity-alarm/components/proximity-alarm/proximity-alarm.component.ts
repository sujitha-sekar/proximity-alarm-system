import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProximityAlarmService, ProximityData } from '../../services/proximity-alarm.service';

@Component({
  selector: 'app-proximity-alarm',
  standalone: true,
  imports: [],
  templateUrl: './proximity-alarm.component.html',
  styleUrl: './proximity-alarm.component.scss'
})
export class ProximityAlarmComponent implements OnInit, OnDestroy {
  currentDetection: ProximityData | null = null;
  isMonitoring = false;
  isAlarmActive = false;
  currentVolume = 0.8;
  private subscription: Subscription = new Subscription();
  
  constructor(private proximityService: ProximityAlarmService) {}
  
  ngOnInit(): void {
    this.subscription.add(
      this.proximityService.detection$.subscribe(detection => {
        this.currentDetection = detection;
        this.isAlarmActive = this.proximityService.getAlarmStatus();
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.proximityService.stopMonitoring();
  }
  
  startMonitoring(): void {
    this.proximityService.startMonitoring();
    this.isMonitoring = true;
  }
  
  stopMonitoring(): void {
    this.proximityService.stopMonitoring();
    this.isMonitoring = false;
  }
  
  setVolume(event: any): void {
    this.currentVolume = parseFloat(event.target.value);
    this.proximityService.setAlarmVolume(this.currentVolume);
  }
}
