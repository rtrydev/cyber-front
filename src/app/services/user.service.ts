import { Injectable } from '@angular/core';
import {ILoginData} from "../interfaces/ILoginData";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  login(loginData: ILoginData) {
    console.log(loginData);
  }
}
