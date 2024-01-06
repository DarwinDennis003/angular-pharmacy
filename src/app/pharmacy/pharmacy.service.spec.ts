import { TestBed } from '@angular/core/testing';

import { PharmacyService } from './pharmacy.service';
import { HttpClientModule } from '@angular/common/http';

describe('PharmacyService', () => {
  let service: PharmacyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientModule]
    });
    service = TestBed.inject(PharmacyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
