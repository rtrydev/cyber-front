import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordPoliciesComponent } from './password-policies.component';

describe('PasswordPoliciesComponent', () => {
  let component: PasswordPoliciesComponent;
  let fixture: ComponentFixture<PasswordPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordPoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
