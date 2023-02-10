import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Roles} from "../../enums/roles";
import {IUserAccount} from "../../interfaces/IUserAccount";
import {environment} from "../../../environments/environment";

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
    {id: 'ACCOUNT_MANIPULATION', title: 'Manipulate accounts', active: true},
    {id: 'REPORTING', title: 'Reporting', active: false},
    {id: 'CONFIG', title: 'Config', active: false}
  ];

  selectedTab = 'ACCOUNT_MANIPULATION';
  canaryToken = environment.canaryToken;

  isAdmin = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.userData.subscribe(user => {
      this.isAdmin = user && user.role === Roles.Admin || false;
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
