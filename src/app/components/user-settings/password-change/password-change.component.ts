import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Roles} from "../../../enums/roles";
import {IPasswordPolicy} from "../../../interfaces/IPasswordPolicy";
import {PasswordPoliciesService} from "../../../services/password-policies.service";
import {PasswordPolicies} from "../../../enums/password-policies";

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  policiesEnum = PasswordPolicies;

  passwordChangedSuccess = false;
  passwordChangedFail = false;
  passwordAlreadyUsed = false;
  wrongPassword = false;
  passwordsNotSame = false;

  passwordPolicies: IPasswordPolicy[] = [];

  public passwordChangeForm = this.formBuilder.group({
    oldPassword: ['', Validators.required],
    password: ['', Validators.required],
    passwordRepeat: ['', Validators.required]
  })

  passwordChangeRequired = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private passwordPolicyService: PasswordPoliciesService) { }

  ngOnInit(): void {
    const userId = this.userService.userData.value?.id;
    if (userId) {
      this.passwordPolicyService.getMyPolicies()
        .subscribe(policies => {
          this.passwordPolicies = policies as IPasswordPolicy[];
        })
    }

    this.userService.userData.subscribe(user => {
      this.passwordChangeRequired = user?.role === Roles.PasswordChangeRequired;
    })
  }

  submit() {
    this.passwordChangedSuccess = false;
    this.passwordChangedFail = false;
    this.passwordAlreadyUsed = false;
    this.wrongPassword = false;
    this.passwordsNotSame = false;

    if (!this.passwordChangeForm.get('password')?.valid) {
      return;
    }
    if (!this.passwordChangeForm.get('oldPassword')?.valid) {
      return;
    }

    if (!this.passwordChangeForm.get('passwordRepeat')?.valid) {
      return;
    }

    if (!(this.passwordChangeForm.get('password')?.value === this.passwordChangeForm.get('passwordRepeat')?.value)) {
      this.passwordsNotSame = true;
      return;
    }

    const newPassword = {
      newPassword: this.passwordChangeForm.get('password')?.value,
      oldPassword: this.passwordChangeForm.get('oldPassword')?.value
    }

    this.userService.changePassword(newPassword).subscribe(result => {
      this.passwordChangedSuccess = true;
    }, err => {
      if (err.error.ErrorCode === 'password_already_used') {
        this.passwordAlreadyUsed = true;
      } else if (err.error.ErrorCode === 'incorrect_credentials') {
        this.wrongPassword = true;
      } else {
        this.passwordChangedFail = true;
      }
    });

    this.passwordChangeForm.reset();
  }

  policyEnabled(key: string) {
    return this.passwordPolicies.some(p => p.key === key && p.enabled);
  }

}
