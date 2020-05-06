import { TestBed } from '@angular/core/testing';

import { TratamientoService } from './tratamiento.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TratamientoService', () => {
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
    const service: TratamientoService = TestBed.get(TratamientoService);
    expect(service).toBeTruthy();
  });
});
