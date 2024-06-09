import { TestBed } from '@angular/core/testing';

import { ValoresNutricionalesService } from './valores-nutricionales.service';

describe('ValoresNutricionalesService', () => {
  let service: ValoresNutricionalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValoresNutricionalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
