import { Injectable } from '@angular/core';
import {ILoginData} from "../interfaces/ILoginData";
import {IUserData} from "../interfaces/IUserData";
import {BehaviorSubject} from "rxjs";
import {Roles} from "../enums/roles";
import {IUserAccount} from "../interfaces/IUserAccount";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../../environments/environment'
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: BehaviorSubject<IUserData | null>;
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.userData = new BehaviorSubject<IUserData | null>(null);
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
    this.userData.next(null);
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }

  getAccountsList() {
    return this.httpClient.get(`${this.apiUrl}/Users`);
  }

  deleteAccount(id: string) {

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