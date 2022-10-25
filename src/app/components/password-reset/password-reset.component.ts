import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  public passwordResetForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
  }

  submit() {
    if (!this.passwordResetForm.get('email')?.valid) {
      return;
    }

    const email = this.passwordResetForm.get('email')?.value

    this.userService.resetPassword(email).subscribe();

    this.passwordResetForm.reset();
  }

}
