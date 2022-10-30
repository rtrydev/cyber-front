import { TestBed } from '@angular/core/testing';

import { PasswordPoliciesService } from './password-policies.service';

describe('PasswordPoliciesService', () => {
  let service: PasswordPoliciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordPoliciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
