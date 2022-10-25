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

    this.userService.changePassword(newPassword).subscribe();

    this.passwordChangeForm.reset();
  }

}
