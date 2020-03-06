import { TestBed } from '@angular/core/testing';

import { LoisirService } from './loisir.service';

describe('LoisirService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoisirService = TestBed.get(LoisirService);
    expect(service).toBeTruthy();
  });
});
