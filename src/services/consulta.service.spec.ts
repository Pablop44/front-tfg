import { TestBed } from '@angular/core/testing';

import { ConsultaService } from './consulta.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ConsultaService', () => {
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
    const service: ConsultaService = TestBed.get(ConsultaService);
    expect(service).toBeTruthy();
  });
});
