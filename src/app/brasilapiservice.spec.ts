import { TestBed } from '@angular/core/testing';

import { Brasilapiservice } from './brasilapiservice';

describe('Brasilapiservice', () => {
  let service: Brasilapiservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Brasilapiservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
