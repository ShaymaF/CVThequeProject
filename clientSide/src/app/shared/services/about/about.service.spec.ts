import { TestBed } from '@angular/core/testing';

import { AboutService } from '../about/about.service';

describe('CvThequeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AboutService = TestBed.get(AboutService);
    expect(service).toBeTruthy();
  });
});
