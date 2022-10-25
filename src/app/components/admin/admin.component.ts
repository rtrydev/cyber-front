import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Roles} from "../../enums/roles";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  adminTabs = [
    {id: 'USER_ADD', title: 'Add user', active: false},
    {id: 'ACCOUNT_MANIPULATION', title: 'Manipulate accounts', active: true},
    {id: 'PASSWORD_POLICIES', title: 'Password policies', active: false}
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

}
