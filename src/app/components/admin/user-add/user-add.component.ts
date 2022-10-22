import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {IUserCreateData} from "../../../interfaces/IUserCreateData";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  isInvalidEmail = false;
  addSuccess = false;

  public addUserForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
  }

  submit() {
    if (!this.addUserForm.get('email')?.valid) {
      this.isInvalidEmail = true;
      return;
    }

    const loginData = {
      username: this.addUserForm.get('username')?.value,
      firstName: this.addUserForm.get('firstName')?.value,
      lastName: this.addUserForm.get('lastName')?.value,
      email: this.addUserForm.get('email')?.value
    } as IUserCreateData;

    this.userService.addAccount(loginData).subscribe(res => {
      console.log(res);
    });

    this.addUserForm.reset();
  }

}
