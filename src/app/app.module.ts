import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AdminComponent } from './components/admin/admin.component';
import { PasswordChangeComponent } from './components/user-settings/password-change/password-change.component';
import { UserAddComponent } from './components/admin/user-add/user-add.component';
import { AccountManipulationComponent } from './components/admin/account-manipulation/account-manipulation.component';
import { PasswordPoliciesComponent } from './components/admin/password-policies/password-policies.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth-interceptor";
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { HomeComponent } from './components/home/home.component';
import { ArticleHeaderComponent } from './components/home/article-header/article-header.component';
import { UserEditComponent } from './components/admin/user-edit/user-edit.component';
import { ReportingViewComponent } from './components/admin/reporting-view/reporting-view.component';
import { ConfigComponent } from './components/admin/config/config.component';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { CaptchaComponent } from './components/captcha/captcha.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AdminComponent,
    PasswordChangeComponent,
    UserAddComponent,
    AccountManipulationComponent,
    PasswordPoliciesComponent,
    UserSettingsComponent,
    PasswordResetComponent,
    HomeComponent,
    ArticleHeaderComponent,
    UserEditComponent,
    ReportingViewComponent,
    ConfigComponent,
    CaptchaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
