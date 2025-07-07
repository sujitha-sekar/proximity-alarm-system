import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximityAlarmComponent } from './proximity-alarm.component';

describe('ProximityAlarmComponent', () => {
  let component: ProximityAlarmComponent;
  let fixture: ComponentFixture<ProximityAlarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProximityAlarmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProximityAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
