import { Component, OnInit } from '@angular/core';
import {IUserAccount} from "../../../interfaces/IUserAccount";
import {UserService} from "../../../services/user.service";
import {faBan, faDeleteLeft, faEdit, faRemove, faTrashCan} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-account-manipulation',
  templateUrl: './account-manipulation.component.html',
  styleUrls: ['./account-manipulation.component.scss']
})
export class AccountManipulationComponent implements OnInit {

  editIcon = faEdit;
  deleteIcon = faTrashCan;
  blockIcon = faBan;

  accounts: IUserAccount[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.accounts = this.userService.getAccountsList();
  }

  editUser(id: string) {

  }

  deleteUser(id: string) {

  }

  blockUser(id: string) {

  }

}
