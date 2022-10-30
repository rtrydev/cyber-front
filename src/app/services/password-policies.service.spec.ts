import { TestBed } from '@angular/core/testing';

import { PasswordPoliciesService } from './password-policies.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PasswordPoliciesService', () => {
  let service: PasswordPoliciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(PasswordPoliciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
