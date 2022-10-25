import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Roles} from "../../enums/roles";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {IUserAccount} from "../../interfaces/IUserAccount";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()
  loginVisible = new EventEmitter<{visible: boolean, user: IUserAccount | null}>();

  userRole: Roles | null = null;
  isAdmin = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.userData.subscribe(user => {
      this.isAdmin = false;

      this.userRole = user?.role ?? null;

      if (this.userRole && this.userRole === Roles.Admin) {
        this.isAdmin = true;
      }

      if (this.userRole && this.userRole === Roles.PasswordChangeRequired) {
        this.router.navigate(['/user-settings']);
        return;
      }
      this.router.navigate(['/']);
    });

    this.userService.loginFromToken();
  }

  logout() {
    this.userService.logout();
  }

}
