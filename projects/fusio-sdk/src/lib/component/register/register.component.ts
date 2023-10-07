import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {UserRegister} from "fusio-sdk/dist/src/generated/consumer/UserRegister";
import {ConsumerService} from "../../service/consumer.service";
import {EventService} from "../../service/event.service";
import {ConfigService} from "../../service/config.service";
import {ErrorService} from "../../service/error.service";

@Component({
  selector: 'fusio-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials: UserRegister = {
    name: '',
    email: '',
    password: '',
  }

  passwordConfirm?: string;
  captchaKey?: string

  response?: Message;
  loading = false

  constructor(private consumer: ConsumerService, private event: EventService, private error: ErrorService, private config: ConfigService) {
  }

  ngOnInit(): void {
    this.captchaKey = this.config.getRecpatcha();
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

      this.response = await this.consumer.getClientAnonymous().account().register(this.credentials);
      this.loading = false;

      this.event.dispatchRegister(this.credentials.name, this.credentials.email);

      this.resetForm();
    } catch (error) {
      this.loading = false;
      this.response = this.error.convert(error);
    }
  }

  setCaptcha(token: string) {
    this.credentials.captcha = token;
  }

  resetForm() {
    this.credentials = {
      name: '',
      email: '',
      password: '',
    };
    this.passwordConfirm = '';
  }

}
