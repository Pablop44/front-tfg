import { TestBed } from '@angular/core/testing';

import { DiabetesService } from './diabetes.service';

describe('DiabetesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiabetesService = TestBed.get(DiabetesService);
    expect(service).toBeTruthy();
  });
});
