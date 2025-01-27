import {Component, OnInit} from '@angular/core';
import {CommonMessage, ConsumerUserRegister} from "fusio-sdk";
import {FusioService} from "../../service/fusio.service";
import {EventService} from "../../service/event.service";
import {ConfigService} from "../../service/config.service";
import {ErrorService} from "../../service/error.service";

@Component({
  selector: 'fusio-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials: ConsumerUserRegister = {
    name: '',
    email: '',
    password: '',
  }

  passwordConfirm?: string;
  captchaKey?: string

  response?: CommonMessage;
  loading = false

  constructor(private fusio: FusioService, private error: ErrorService, private config: ConfigService) {
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

      if (!this.credentials.name) {
        throw new Error('No name provided');
      }

      if (!this.credentials.email) {
        throw new Error('No email provided');
      }

      if (this.captchaKey && !this.credentials.captcha) {
        throw new Error('No captcha provided');
      }

      this.response = await this.fusio.getClientAnonymous().consumer().account().register(this.credentials);
      this.loading = false;

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
