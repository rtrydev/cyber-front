import { Component, OnInit } from '@angular/core';
import {CaptchaService} from "../../services/captcha.service";
import {ICaptchaData} from "../../interfaces/ICaptchaData";

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {
  captchaData: ICaptchaData | null = null;
  captchaImg: string | null = null;
  captchaOptions: { index: number; image: string; }[] | null = null;

  isDuringCheck: boolean = false;
  checkedIndex: number = -1;
  captchaValidState: boolean = false;
  captchaFailed: boolean = false;

  constructor(private captchaService: CaptchaService) { }

  ngOnInit(): void {
    this.loadCaptcha();
  }

  public selectPiece(index: number) {
    if(this.isDuringCheck || this.captchaValidState) {
      return;
    }

    this.checkedIndex = index;
    this.captchaFailed = false;
    this.isDuringCheck = true;

    this.captchaService.sendAnswer(this.captchaData?.id || "", index)
      .subscribe(result => {
        if (result.success) {
          this.captchaValidState = true;
          this.checkedIndex = -1;
        } else {
          this.loadCaptcha();
        }
      });
  }

  public resetCaptcha() {
    this.isDuringCheck = false;
    this.checkedIndex = -1;
    this.captchaValidState = false;
    this.captchaFailed = false;
    this.captchaData = null;

    this.loadCaptcha();
  }

  private loadCaptcha() {
    this.captchaService.getCaptcha().subscribe(result => {
      this.captchaData = result as ICaptchaData;

      this.captchaImg = "data:image/jpg;base64," + this.captchaData?.big_img;
      const small_images = this.captchaData?.small_imgs.map(
        (img, i) => {
          return {
            index: i,
            image: "data:image/jpg;base64," + img
          }
        }
      );

      this.captchaOptions = small_images?.sort(_ => (Math.random() > .5) ? 1 : -1) || null;
      this.isDuringCheck = false;

      if (this.checkedIndex !== -1) {
        this.checkedIndex = -1;
        this.captchaFailed = true;
      }
    });
  }

}
