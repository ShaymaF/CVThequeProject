import { TestBed } from '@angular/core/testing';

import { DiversService } from './divers.service';

describe('DiversService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiversService = TestBed.get(DiversService);
    expect(service).toBeTruthy();
  });
});
