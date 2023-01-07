import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ICaptchaResult} from "../interfaces/ICaptchaResult";
import {BehaviorSubject, map, mergeMap, switchMap} from "rxjs";
import {ICaptchaData} from "../interfaces/ICaptchaData";

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  captchaApiUrl = environment.captchaApiUrl;
  currentCaptchaChallengeId: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  captchaCompleted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  public getCaptcha() {
    return this.httpClient.post<ICaptchaData>(`${this.captchaApiUrl}/start`, {})
      .pipe(
        map(result => {
          this.currentCaptchaChallengeId.next(result.id);
          return result
        })
      )
  }

  public sendAnswer(captchaId: string, answer: number) {
    return this.httpClient.post<ICaptchaResult>(`${this.captchaApiUrl}/answer?id=${captchaId}&answer=${answer}`, {})
      .pipe(
        map(result => {
          if (result.success) {
            this.captchaCompleted.next(true);
          } else {
            this.captchaCompleted.next(false);
          }

          return result;
        })
      )
  }
}
