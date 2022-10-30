import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PasswordPoliciesService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getPolicies(userId: string) {
    return this.httpClient.get(`${this.apiUrl}/PasswordPolicies?userId=${userId}`);
  }

  public enablePolicy(userId: string, key: string) {
    const body = {
      userId,
      key
    };

    return this.httpClient.post(`${this.apiUrl}/PasswordPolicies/Enable`, body);
  }

  public disablePolicy(userId: string, key: string) {
    const body = {
      userId,
      key
    };

    return this.httpClient.post(`${this.apiUrl}/PasswordPolicies/Disable`, body);
  }

  public getPasswordExpireTime(userId: string) {
    return this.httpClient.get(`${this.apiUrl}/PasswordPolices/PasswordExpireTime?userGuid=${userId}`);
  }

  public setPasswordExpireTime(userId: string, days: number) {
    const body = {
      userId,
      expireTimeInDays: days
    };

    return this.httpClient.post(`${this.apiUrl}/PasswordPolicies/PasswordExpireTime`, body);
  }
}
