import { Injectable } from '@angular/core';
import {ILoginData} from "../interfaces/ILoginData";
import {IUserData} from "../interfaces/IUserData";
import {BehaviorSubject} from "rxjs";
import {Roles} from "../enums/roles";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: BehaviorSubject<IUserData | null>;

  constructor() {
    this.userData = new BehaviorSubject<IUserData | null>(null);
  }

  login(loginData: ILoginData) {
    console.log(loginData);

    const someUser = {
      id: 'test',
      role: Roles.Admin,
      token: 'some-jwt'
    } as IUserData;


    this.userData.next(someUser);
  }
}
