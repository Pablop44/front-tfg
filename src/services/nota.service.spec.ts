import { TestBed } from '@angular/core/testing';

import { NotaService } from './nota.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NotaService', () => {
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
    const service: NotaService = TestBed.get(NotaService);
    expect(service).toBeTruthy();
  });
});
