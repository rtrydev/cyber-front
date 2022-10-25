import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IUserAccount} from "../../../interfaces/IUserAccount";
import {UserService} from "../../../services/user.service";
import {faBan, faCheck, faDeleteLeft, faEdit, faRemove, faTrashCan} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-account-manipulation',
  templateUrl: './account-manipulation.component.html',
  styleUrls: ['./account-manipulation.component.scss']
})
export class AccountManipulationComponent implements OnInit {

  @Output()
  userEditVisible = new EventEmitter<{visible: boolean, user: IUserAccount | null}>();

  editIcon = faEdit;
  deleteIcon = faTrashCan;
  blockIcon = faBan;
  unblockIcon = faCheck

  accounts: IUserAccount[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAccountsList()
      .subscribe(accounts => {
        this.accounts = accounts as IUserAccount[];
      });
  }

  editUser(user: IUserAccount) {
    this.userEditVisible.emit({visible: true, user});
  }

  deleteUser(id: string) {
    this.userService.deleteAccount(id);
    const account = this.accounts.find(account => account.userId === id);

    if (!account) {
      return;
    }

    this.userService.deleteAccount(id).subscribe(res => {
      const index = this.accounts.indexOf(account);
      this.accounts.splice(index, 1);
    })
  }

  blockUser(id: string) {
    const account = this.accounts.find(acc => acc.userId === id);
    if (!account) {
      return;
    }

    if (account.isBlocked) {
      this.userService.unlockAccount(id).subscribe();
    } else {
      this.userService.blockAccount(id).subscribe();
    }

    account.isBlocked = !account.isBlocked;
  }

}
