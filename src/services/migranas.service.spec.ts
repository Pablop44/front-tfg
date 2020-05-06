import { TestBed } from '@angular/core/testing';

import { MigranasService } from './migranas.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('MigranasService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,
      RouterTestingModule  ],
    declarations: [
    ],
    providers: []
  }));

  it('should be created', () => {
    const service: MigranasService = TestBed.get(MigranasService);
    expect(service).toBeTruthy();
  });
});
