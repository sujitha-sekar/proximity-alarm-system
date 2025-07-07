import { TestBed } from '@angular/core/testing';

import { ProximityAlarmService } from './proximity-alarm.service';

describe('ProximityAlarmService', () => {
  let service: ProximityAlarmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProximityAlarmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
