import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ICaptchaResult} from "../interfaces/ICaptchaResult";

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  captchaApiUrl = environment.captchaApiUrl;

  constructor(private httpClient: HttpClient) { }

  public getCaptcha() {
    return this.httpClient.post(`${this.captchaApiUrl}/start`, {});
  }

  public sendAnswer(captchaId: string, answer: number) {
    return this.httpClient.post<ICaptchaResult>(`${this.captchaApiUrl}/answer?id=${captchaId}&answer=${answer}`, {})
  }
}
