import { Component, OnInit } from '@angular/core';
import {IUserAccount} from "../../../interfaces/IUserAccount";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-account-manipulation',
  templateUrl: './account-manipulation.component.html',
  styleUrls: ['./account-manipulation.component.scss']
})
export class AccountManipulationComponent implements OnInit {

  accounts: IUserAccount[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.accounts = this.userService.getAccountsList();
  }

}
