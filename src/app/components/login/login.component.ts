import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
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
    login: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
  }

  submit() {
    if (!this.loginForm.get('login')?.valid) {
      this.isInvalidEmail = true;
      return;
    }

    const loginData = {
      login: this.loginForm.get('login')?.value,
      password: this.loginForm.get('password')?.value
    } as ILoginData;

    this.userService.login(loginData);

    this.loginForm.reset();
  }

}
