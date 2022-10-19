import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {timeout} from "rxjs";
import {UserService} from "../../services/user.service";
import {ILoginData} from "../../interfaces/ILoginData";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isInvalidEmail = false;

  public loginForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
  }

  submit() {
    if (!this.loginForm.get('email')?.valid) {
      this.isInvalidEmail = true;
      return;
    }

    const loginData = {
      login: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    } as ILoginData;

    this.userService.login(loginData).subscribe(x => {
      console.log(x);
    });

    this.loginForm.reset();
  }

}
