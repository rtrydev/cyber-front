import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {IUserAccount} from "../../../interfaces/IUserAccount";
import {UserService} from "../../../services/user.service";
import {IUserEditData} from "../../../interfaces/IUserEditData";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements AfterViewInit {

  @Input()
  user: IUserAccount | null = null;

  public editUserForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    role: [0, Validators.required]
  })

  @Output()
  visibilityChanged = new EventEmitter<{visible: boolean, user: IUserAccount | null}>();

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngAfterViewInit() {
    this.editUserForm.controls['email'].setValue(this.user?.email ?? '');
    this.editUserForm.controls['username'].setValue(this.user?.username ?? '');
    this.editUserForm.controls['firstName'].setValue(this.user?.firstName ?? '');
    this.editUserForm.controls['lastName'].setValue(this.user?.lastName ?? '');
    this.editUserForm.controls['role'].setValue(this.user?.role ?? 0);
  }

  closeEdit() {
    this.visibilityChanged.emit({visible: false, user: null});
  }

  submit() {
    const user = {
      userId: this.user?.userId,
      email: this.editUserForm.get('email')?.value,
      username: this.editUserForm.get('username')?.value,
      firstName: this.editUserForm.get('firstName')?.value,
      lastName: this.editUserForm.get('lastName')?.value,
    } as IUserEditData;

    this.userService.editAccount(user)
      .subscribe(user => {
        this.userService.userUpdated.next(user as IUserAccount);
        this.closeEdit();
      });
  }

}
