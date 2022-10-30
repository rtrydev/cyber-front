import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Roles} from "../../../enums/roles";

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  passwordChangedSuccess = false;
  passwordChangedFail = false;
  passwordAlreadyUsed = false;

  public passwordChangeForm = this.formBuilder.group({
    password: ['', Validators.required],
    passwordRepeat: ['', Validators.required]
  })

  passwordChangeRequired = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userData.subscribe(user => {
      this.passwordChangeRequired = user?.role === Roles.PasswordChangeRequired;
    })
  }

  submit() {
    this.passwordChangedSuccess = false;
    this.passwordChangedFail = false;
    this.passwordAlreadyUsed = false;

    if (!this.passwordChangeForm.get('password')?.valid) {
      return;
    }

    if (!this.passwordChangeForm.get('passwordRepeat')?.valid) {
      return;
    }

    if (!(this.passwordChangeForm.get('password')?.value === this.passwordChangeForm.get('passwordRepeat')?.value)) {
      return;
    }

    const newPassword = this.passwordChangeForm.get('password')?.value

    this.userService.changePassword(newPassword).subscribe(result => {
      this.passwordChangedSuccess = true;
    }, err => {
      if (err.error.ErrorCode === 'password_already_used') {
        this.passwordAlreadyUsed = true;
      } else {
        this.passwordChangedFail = true;
      }
    });

    this.passwordChangeForm.reset();
  }

}
