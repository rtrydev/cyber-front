import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IConfig } from 'src/app/interfaces/IConfig';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  public updateConfigForm = this.formBuilder.group({
    inactiveTimeout: ['', Validators.required],
    allowedLoginAttempts: ['', Validators.required],
    failedLoginTimeout: ['', Validators.required]
  })

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadConfig();
  }

  loadConfig(){
    this.userService.getConfig().subscribe(res => {
      let config = res as IConfig;
      this.updateConfigForm.get("inactiveTimeout")?.setValue(config.inactiveTimeout);
      this.updateConfigForm.get("allowedLoginAttempts")?.setValue(config.allowedLoginAttempts);
      this.updateConfigForm.get("failedLoginTimeout")?.setValue(config.failedLoginTimeout);
    })
  }

  submit(){
    this.userService.setConfigInactiveTimeout(Number(this.updateConfigForm.get("inactiveTimeout")?.value)).subscribe(res => {
      this.userService.setConfigAllowedLoginAttempts(Number(this.updateConfigForm.get("allowedLoginAttempts")?.value)).subscribe(res => {
        this.userService.setConfigFailedLoginTimeout(Number(this.updateConfigForm.get("failedLoginTimeout")?.value)).subscribe(res => {
          this.loadConfig()
        });
      });
    });
  }

}
