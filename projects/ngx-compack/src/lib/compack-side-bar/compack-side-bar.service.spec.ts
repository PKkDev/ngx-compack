import { TestBed } from '@angular/core/testing';

import { CompackSideBarService } from './compack-side-bar.service';

describe('CompackSideBarService', () => {
  let service: CompackSideBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompackSideBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
