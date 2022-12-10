import { Injectable } from '@angular/core';
import {ILoginData} from "../interfaces/ILoginData";
import {IUserData} from "../interfaces/IUserData";
import {BehaviorSubject} from "rxjs";
import {Roles} from "../enums/roles";
import {IUserAccount} from "../interfaces/IUserAccount";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../../environments/environment'
import {Router} from "@angular/router";
import {IUserCreateData} from "../interfaces/IUserCreateData";
import {IUserEditData} from "../interfaces/IUserEditData";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: BehaviorSubject<IUserData | null>;
  userStatus: BehaviorSubject<string | null>;
  apiUrl = environment.apiUrl;

  userUpdated: BehaviorSubject<IUserAccount | null>

  constructor(private httpClient: HttpClient, private router: Router) {
    this.userData = new BehaviorSubject<IUserData | null>(null);
    this.userStatus = new BehaviorSubject<string | null>(null);
    this.userUpdated = new BehaviorSubject<IUserAccount | null>(null);
  }

  login(loginData: ILoginData) {
    this.httpClient.post(`${this.apiUrl}/Users/Login`, loginData, {responseType: 'text'})
      .subscribe(token => {
        const parsedJwt = this.parseJwt(token);

        const user = {
          id: parsedJwt.UserId,
          token: token,
          role: parsedJwt.role
        } as IUserData;

        localStorage.setItem("user", JSON.stringify(user));

        this.userData.next(user);
      },error => {
        if (error.status === 401) {
          const errorBody = JSON.parse(error.error);

          if (errorBody.ErrorCode === "user_blocked") {
            this.userStatus.next('blocked');
          }

          if (errorBody.ErrorCode === "password_expired") {
            this.userStatus.next('expired');
          }

        }

        if (error.status === 403) {
          this.userStatus.next('invalid pass');
        }
      })
  }

  loginFromToken() {
    const userString = localStorage.getItem("user");

    if (!userString) {
      return;
    }

    const user = JSON.parse(userString);

    this.userData.next(user as IUserData);
  }

  logout() {
    this.httpClient.post(`${this.apiUrl}/Users/Logout`, {}).subscribe();
    this.userData.next(null);
    localStorage.removeItem("user");
    this.router.navigate(['/login']).then();
  }

  changePassword(password: {newPassword: string, oldPassword: string}) {
    return this.httpClient.post(`${this.apiUrl}/Users/ChangePassword`, password);
  }

  resetPassword(email: string) {
    return this.httpClient.post(`${this.apiUrl}/Users/ResetPassword?email=${email}`, {});
  }

  getAccountsList() {
    return this.httpClient.get(`${this.apiUrl}/Users`);
  }

  addAccount(user: IUserCreateData) {
    return this.httpClient.post(`${this.apiUrl}/Users`, user);
  }

  blockAccount(id: string) {
    return this.httpClient.post(`${this.apiUrl}/Users/Block`, {userId: id});
  }

  unlockAccount(id: string) {
    return this.httpClient.post(`${this.apiUrl}/Users/Unlock`, {userId: id});
  }

  deleteAccount(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/Users`, {body: {userId: id}});
  }

  editAccount(user: IUserEditData) {
    return this.httpClient.put(`${this.apiUrl}/Users`, user);
  }

  private parseJwt (token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
}
