import { TestBed } from '@angular/core/testing';

import { MarcaService } from './marca.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MarcaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,
      RouterTestingModule ],
    declarations: [
    ],
    providers: []
  }));

  it('should be created', () => {
    const service: MarcaService = TestBed.get(MarcaService);
    expect(service).toBeTruthy();
  });
});
