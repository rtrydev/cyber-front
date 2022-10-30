import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Roles} from "../../enums/roles";
import {IUserAccount} from "../../interfaces/IUserAccount";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userEditVisible: boolean = false;
  passwordPoliciesVisible: boolean = false

  userForEdit: IUserAccount | null = null;

  adminTabs = [
    {id: 'USER_ADD', title: 'Add user', active: false},
    {id: 'ACCOUNT_MANIPULATION', title: 'Manipulate accounts', active: true}
  ];

  selectedTab = 'ACCOUNT_MANIPULATION';

  isAdmin = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.userData.subscribe(user => {
      this.isAdmin = user && user.role === Roles.Admin || true;
    });
  }

  selectTab(index: number) {
    this.adminTabs.forEach(tab => {
      tab.active = false;
    });

    this.adminTabs[index].active = true;
    this.selectedTab = this.adminTabs[index].id;
  }

  showUserEdit(event: {visible: boolean, user: IUserAccount | null}) {
    this.userEditVisible = event.visible;
    this.userForEdit = event.user;
  }

  showPolicyEdit(event: {visible: boolean, user: IUserAccount | null}) {
    this.passwordPoliciesVisible = event.visible;
    this.userForEdit = event.user;
  }

}
