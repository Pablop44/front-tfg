import { TestBed } from '@angular/core/testing';

import { MigranasService } from './migranas.service';

describe('MigranasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MigranasService = TestBed.get(MigranasService);
    expect(service).toBeTruthy();
  });
});
