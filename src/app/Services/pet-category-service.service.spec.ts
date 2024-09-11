import { TestBed } from '@angular/core/testing';

import { PetCategoryServiceService } from './pet-category-service.service';

describe('PetCategoryServiceService', () => {
  let service: PetCategoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetCategoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
