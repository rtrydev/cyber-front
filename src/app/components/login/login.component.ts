import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ILoginData} from "../../interfaces/ILoginData";
import {CaptchaService} from "../../services/captcha.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isInvalidEmail = false;
  expired = false;
  isInvalidPassword = false;
  isBlocked = false;
  isTooManyAttempts = false;
  captchaNotCompleted = false;
  currentCaptchaChallengeId: string | null = null;



  public loginForm = this.formBuilder.group({
    login: ['', Validators.required],
    password: [''],
    singleTimePassword: ['']
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService, private captchaService: CaptchaService) { }

  ngOnInit(): void {
    this.userService.userStatus.next(null);

    this.userService.userStatus.subscribe(status => {
      this.expired = status === 'expired';
      this.isInvalidPassword = status === 'invalid pass';
      this.isBlocked = status === 'blocked';
      this.isTooManyAttempts = status === 'attempts';
    });

    this.captchaService.currentCaptchaChallengeId
      .subscribe(value => {
        this.currentCaptchaChallengeId = value;
      });

    this.captchaService.captchaCompleted
      .subscribe(value => {
        this.captchaNotCompleted = !value;
      });
  }

  submit() {
    this.isInvalidPassword = false;
    this.expired = false;
    this.isBlocked = false;
    this.isInvalidEmail = false;
    this.isTooManyAttempts = false;

    if (!this.loginForm.get('login')?.valid) {
      this.isInvalidEmail = true;
      return;
    }

    const isSinglePassword = !!this.loginForm.get('singleTimePassword')?.value;

    const loginData = {
      login: this.loginForm.get('login')?.value,
      password: isSinglePassword
      ? Number(this.loginForm.get('singleTimePassword')?.value)
      : this.loginForm.get('password')?.value,
      captchaChallengeId: this.currentCaptchaChallengeId
    } as ILoginData;

    this.userService.login(loginData, isSinglePassword);

    this.loginForm.reset();
  }

}
