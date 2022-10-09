import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    email: '',
    password: ''
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  submit() {

  }

}
