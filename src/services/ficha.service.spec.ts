import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FichaService } from './ficha.service';

describe('FichaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule],
    providers: []
  }));

  it('should be created', () => {
    const service: FichaService = TestBed.get(FichaService);
    expect(service).toBeTruthy();
  });
});
