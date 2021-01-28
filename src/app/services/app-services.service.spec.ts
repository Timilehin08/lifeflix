import { TestBed } from '@angular/core/testing';

import { AppServicesService } from './app-services.service';

describe('AppServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppServicesService = TestBed.get(AppServicesService);
    expect(service).toBeTruthy();
  });
});
