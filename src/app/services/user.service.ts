import { Injectable } from '@angular/core';
import {ILoginData} from "../interfaces/ILoginData";
import {IUserData} from "../interfaces/IUserData";
import {BehaviorSubject} from "rxjs";
import {Roles} from "../enums/roles";
import {IUserAccount} from "../interfaces/IUserAccount";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: BehaviorSubject<IUserData | null>;

  accounts: IUserAccount[] = [
    {id: 'test1', userName: 'user1', firstName: 'Jan', lastName: 'Kowalski', email: 'a@a.com', isBlocked: false},
    {id: 'test2', userName: 'user2', firstName: 'Jan', lastName: 'Kowalski', email: 'a@a.com', isBlocked: false},
    {id: 'test3', userName: 'user3', firstName: 'Jan', lastName: 'Kowalski', email: 'a@a.com', isBlocked: true},
    {id: 'test4', userName: 'user4', firstName: 'Jan', lastName: 'Kowalski', email: 'a@a.com', isBlocked: false},
    {id: 'test5', userName: 'user5', firstName: 'Jan', lastName: 'Kowalski', email: 'a@a.com', isBlocked: false},
    {id: 'test6', userName: 'user6', firstName: 'Jan', lastName: 'Kowalski', email: 'a@a.com', isBlocked: true},
    {id: 'test7', userName: 'user7', firstName: 'Jan', lastName: 'Kowalski', email: 'a@a.com', isBlocked: false},
    {id: 'test8', userName: 'user8', firstName: 'Jan', lastName: 'Kowalski', email: 'a@a.com', isBlocked: false},
    {id: 'test9', userName: 'user9', firstName: 'Jan', lastName: 'Kowalski', email: 'a@a.com', isBlocked: false},
  ]

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

  getAccountsList() {
    return this.accounts;
  }
}
