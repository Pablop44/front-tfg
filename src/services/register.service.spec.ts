import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,
      RouterTestingModule ],
    declarations: [
    ],
    providers: []
  }));

  it('should be created', () => {
    const service: RegisterService = TestBed.get(RegisterService);
    expect(service).toBeTruthy();
  });
});
