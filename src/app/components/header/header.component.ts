import {Component, OnInit} from '@angular/core';
import {Roles} from "../../enums/roles";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userRole: Roles | null = null;
  isAdmin = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userData.subscribe(user => {
      this.isAdmin = false;

      this.userRole = user?.role ?? null;
      if (this.userRole && this.userRole === Roles.Admin) {
        this.isAdmin = true;
      }
    });
  }

  logout() {
    this.userService.userData.next(null);
  }

}
