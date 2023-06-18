import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {ActivatedRoute} from "@angular/router";
import {UserEmail} from "fusio-sdk/dist/src/generated/consumer/UserEmail";
import {ConsumerService} from "../../../service/consumer.service";
import {ErrorService} from "../../../service/error.service";
import {ConfigService} from "../../../service/config.service";

@Component({
  selector: 'fusio-password-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  data: UserEmail = {
    email: '',
  }

  captchaKey?: string

  response?: Message;
  loading = false

  constructor(private consumer: ConsumerService, private error: ErrorService, private config: ConfigService, protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let captchaKey = this.config.getRecpatcha();
    if (captchaKey) {
      this.captchaKey = captchaKey;
    }
  }

  public async doReset() {
    this.loading = true;

    try {
      if (this.captchaKey && !this.data.captcha) {
        throw new Error('No captcha provided');
      }

      this.response = await this.consumer.getClientAnonymous().account().requestPasswordReset(this.data);
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
