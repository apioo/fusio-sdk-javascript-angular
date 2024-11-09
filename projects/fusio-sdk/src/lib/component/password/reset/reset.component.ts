import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommonMessage, ConsumerUserEmail} from "fusio-sdk";
import {FusioService} from "../../../service/fusio.service";
import {ErrorService} from "../../../service/error.service";
import {ConfigService} from "../../../service/config.service";

@Component({
  selector: 'fusio-password-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  data: ConsumerUserEmail = {
    email: '',
  }

  captchaKey?: string

  response?: CommonMessage;
  loading = false

  constructor(private fusio: FusioService, private error: ErrorService, private config: ConfigService, protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.captchaKey = this.config.getRecpatcha();
  }

  public async doReset() {
    this.loading = true;

    try {
      if (this.captchaKey && !this.data.captcha) {
        throw new Error('No captcha provided');
      }

      this.response = await this.fusio.getClientAnonymous().consumer().account().requestPasswordReset(this.data);
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.response = this.error.convert(error);
    }
  }

  setCaptcha(token: string) {
    this.data.captcha = token;
  }

}
