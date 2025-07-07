import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProximityAlarmComponent } from './proximity-alarm/components/proximity-alarm/proximity-alarm.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProximityAlarmComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'proximity-alarm-system';
}
