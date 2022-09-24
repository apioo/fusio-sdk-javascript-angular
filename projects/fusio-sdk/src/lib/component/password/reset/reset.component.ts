import {Component, Inject, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {ActivatedRoute} from "@angular/router";
import axios from "axios";
import {UserEmail} from "fusio-sdk/dist/src/generated/consumer/UserEmail";
import {ConsumerService} from "../../../service/consumer.service";
import {Config, FUSIO_CONFIG} from "../../../config/config";
import {ErrorConverter} from "../../../util/error-converter";

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

  constructor(private consumer: ConsumerService, protected route: ActivatedRoute, @Inject(FUSIO_CONFIG) private config: Config) {
  }

  ngOnInit(): void {
    let captchaKey = this.config.recaptcha;
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

      const client = this.consumer.getClientAnonymous();
      const resource = await client.getConsumerPasswordReset();
      const response = await resource.consumerActionUserResetPasswordRequest(this.data);

      this.response = response.data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.response = ErrorConverter.convert(error);
    }
  }

  setCaptcha(token: string) {
    this.data.captcha = token;
  }

}
