import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import axios from "axios";
import {User_Register} from "fusio-sdk/dist/src/generated/consumer/User_Register";
import {ConsumerService} from "../../service/consumer.service";

@Component({
  selector: 'fusio-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials: User_Register = {
    name: '',
    email: '',
    password: '',
  }

  passwordConfirm?: string;
  captchaKey?: string

  response?: Message;
  loading = false

  constructor(private consumer: ConsumerService, private config: RecaptchaConfig) {
  }

  ngOnInit(): void {
    let captchaKey = this.config.getKey()
    if (captchaKey) {
      this.captchaKey = captchaKey;
    }
  }

  async register() {
    this.loading = true;

    try {
      if (this.credentials.password !== this.passwordConfirm) {
        throw new Error('The provided password does not match with the confirmation password');
      }

      if (this.captchaKey && !this.credentials.captcha) {
        throw new Error('No captcha provided');
      }

      const client = this.consumer.getClientAnonymous();
      const account = await client.consumerUser();
      const response = await account.getConsumerRegister().consumerActionUserRegister(this.credentials);

      this.response = response.data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      if (axios.isAxiosError(error) && error.response)  {
        this.response = {
          success: false,
          message: error.response.data.message || 'An unknown error occurred',
        };
      } else {
        this.response = {
          success: false,
          message: String(error),
        };
      }
    }
  }

  setCaptcha(token: string) {
    this.credentials.captcha = token;
  }

}

export interface RecaptchaConfig {
  getKey(): string|null;
}
