import { TestBed } from '@angular/core/testing';

import { AsmaService } from './asma.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AsmaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,
      RouterTestingModule ],
    declarations: [
    ],
    providers: []
  }));

  it('should be created', () => {
    const service: AsmaService = TestBed.get(AsmaService);
    expect(service).toBeTruthy();
  });
});
