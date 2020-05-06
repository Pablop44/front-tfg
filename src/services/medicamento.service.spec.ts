import { TestBed } from '@angular/core/testing';

import { MedicamentoService } from './medicamento.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MedicamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,
      RouterTestingModule ],
    declarations: [
    ],
    providers: []
  }));

  it('should be created', () => {
    const service: MedicamentoService = TestBed.get(MedicamentoService);
    expect(service).toBeTruthy();
  });
});
