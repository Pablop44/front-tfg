import { TestBed } from '@angular/core/testing';

import { FichaEnfermedadService } from './ficha-enfermedad.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('FichaEnfermedadService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule, RouterTestingModule ],
    declarations: [
    ],
    providers: []
  }));

  it('should be created', () => {
    const service: FichaEnfermedadService = TestBed.get(FichaEnfermedadService);
    expect(service).toBeTruthy();
  });
});
