import { TestBed } from '@angular/core/testing';

import { TratamientoService } from './tratamiento.service';

describe('TratamientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TratamientoService = TestBed.get(TratamientoService);
    expect(service).toBeTruthy();
  });
});
