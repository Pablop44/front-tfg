import { TestBed } from '@angular/core/testing';

import { FichaEnfermedadService } from './ficha-enfermedad.service';

describe('FichaEnfermedadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FichaEnfermedadService = TestBed.get(FichaEnfermedadService);
    expect(service).toBeTruthy();
  });
});
