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

  constructor(private captchaService: CaptchaService) { }

  ngOnInit(): void {
    this.captchaService.getCaptcha().subscribe(result => {
      this.captchaData = JSON.parse(result);

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
    });
  }

}
