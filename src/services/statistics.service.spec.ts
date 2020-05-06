import { TestBed } from '@angular/core/testing';

import { StatisticsService } from './statistics.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StatisticsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ 
      HttpClientTestingModule,
      RouterTestingModule
     ],
    declarations: [
    ],
    providers: []
  }));

  it('should be created', () => {
    const service: StatisticsService = TestBed.get(StatisticsService);
    expect(service).toBeTruthy();
  });
});
