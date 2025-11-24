import {Component, OnInit, signal} from '@angular/core';
import {CommonMessage, ConsumerUserRegister} from "fusio-sdk";
import {FusioService} from "../../service/fusio.service";
import {EventService} from "../../service/event.service";
import {ConfigService} from "../../service/config.service";
import {ErrorService} from "../../service/error.service";
import {MessageComponent} from "../message/message.component";
import {FormsModule} from "@angular/forms";
import {NgxCaptchaModule} from "ngx-captcha";

@Component({
  selector: 'fusio-register',
  templateUrl: './register.component.html',
  imports: [
    MessageComponent,
    FormsModule,
    NgxCaptchaModule
  ],
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

  response = signal<CommonMessage|undefined>(undefined);
  loading = signal<boolean>(false);

  constructor(private fusio: FusioService, private error: ErrorService, private config: ConfigService) {
  }

  ngOnInit(): void {
    this.captchaKey = this.config.getRecpatcha();
  }

  async register() {
    this.loading.set(true);

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

      this.response.set(await this.fusio.getClientAnonymous().consumer().account().register(this.credentials));
      this.loading.set(false);

      this.resetForm();
    } catch (error) {
      this.loading.set(false);
      this.response.set(this.error.convert(error));
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
