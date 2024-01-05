import { TestBed } from '@angular/core/testing';

import { UtilityMethodService } from './utility-method.service';

describe('UtilityMethodService', () => {
  let service: UtilityMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
