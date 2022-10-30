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
    })
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

}
