import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUserAccount} from "../../../interfaces/IUserAccount";
import {PasswordPolicies} from "../../../enums/password-policies";
import {PasswordPoliciesService} from "../../../services/password-policies.service";
import {IPasswordPolicy} from "../../../interfaces/IPasswordPolicy";

@Component({
  selector: 'app-password-policies',
  templateUrl: './password-policies.component.html',
  styleUrls: ['./password-policies.component.scss']
})
export class PasswordPoliciesComponent implements OnInit{

  currentUserPolicies: IPasswordPolicy[] = [];

  expirationTime: number = -1;
  expirationChangeSuccess = false;
  expirationChangeFail = false;

  @Input()
  userId: string = "";

  @Output()
  visibilityChanged = new EventEmitter<{visible: boolean, user: IUserAccount | null}>();

  closePolicies() {
    this.visibilityChanged.emit({visible: false, user: null});
  }

  constructor(private passwordPolicyService: PasswordPoliciesService) { }

  ngOnInit(): void {
    this.passwordPolicyService.getPolicies(this.userId).subscribe(policy => {
      this.currentUserPolicies = policy as [];
    });

    this.passwordPolicyService.getPasswordExpireTime(this.userId).subscribe(expireTime => {
      this.expirationTime = expireTime as number;
    });
  }

  togglePolicy(key: string, event: any) {
    if (!this.userId) {
      return;
    }

    const newValue = event.target.checked;

    if (newValue === true) {
      this.passwordPolicyService.enablePolicy(this.userId, key)
        .subscribe();
    }
    if (newValue === false) {
      this.passwordPolicyService.disablePolicy(this.userId, key)
        .subscribe();
    }

  }

  changeExpireTime() {
    this.expirationChangeSuccess = false;
    this.expirationChangeFail = false;

    this.passwordPolicyService.setPasswordExpireTime(this.userId, this.expirationTime)
      .subscribe(result => {
        this.expirationChangeSuccess = true;
      }, err => {
        this.expirationChangeFail = true;
      });
  }

}
