import { TestBed } from '@angular/core/testing';

import { CertificatService } from './certificat.service';

describe('CertificatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CertificatService = TestBed.get(CertificatService);
    expect(service).toBeTruthy();
  });
});
