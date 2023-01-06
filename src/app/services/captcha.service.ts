import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  captchaApiUrl = environment.captchaApiUrl;

  constructor(private httpClient: HttpClient) { }

  public getCaptcha() {
    return this.httpClient.post(`${this.captchaApiUrl}/start`, {}, {responseType: 'text'});
  }
}
