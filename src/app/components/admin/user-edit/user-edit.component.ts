import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {IUserAccount} from "../../../interfaces/IUserAccount";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, AfterViewInit {

  @Input()
  user: IUserAccount | null = null;

  public editUserForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  })

  @Output()
  visibilityChanged = new EventEmitter<{visible: boolean, user: IUserAccount | null}>();

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.editUserForm.controls['email'].setValue(this.user?.email ?? '');
    this.editUserForm.controls['username'].setValue(this.user?.username ?? '');
    this.editUserForm.controls['firstName'].setValue(this.user?.firstName ?? '');
    this.editUserForm.controls['lastName'].setValue(this.user?.lastName ?? '');
  }

  closeEdit() {
    this.visibilityChanged.emit({visible: false, user: null});
  }

  submit() {
  }

}
