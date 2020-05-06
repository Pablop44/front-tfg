import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DiabetesService } from './diabetes.service';

describe('DiabetesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
    ],
    providers: [],
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: DiabetesService = TestBed.get(DiabetesService);
    expect(service).toBeTruthy();
  });
});
