import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommonMessage, ConsumerUserEmail} from "fusio-sdk";
import {FusioService} from "../../../service/fusio.service";
import {ErrorService} from "../../../service/error.service";
import {ConfigService} from "../../../service/config.service";
import {MessageComponent} from "../../message/message.component";
import {FormsModule} from "@angular/forms";
import {NgxCaptchaModule} from "ngx-captcha";

@Component({
  selector: 'fusio-password-reset',
  templateUrl: './reset.component.html',
  imports: [
    MessageComponent,
    FormsModule,
    NgxCaptchaModule
  ],
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  data: ConsumerUserEmail = {
    email: '',
  }

  captchaKey?: string

  response = signal<CommonMessage|undefined>(undefined);
  loading = signal<boolean>(false);

  constructor(private fusio: FusioService, private error: ErrorService, private config: ConfigService, protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.captchaKey = this.config.getRecpatcha();
  }

  public async doReset() {
    this.loading.set(true);

    try {
      if (this.captchaKey && !this.data.captcha) {
        throw new Error('No captcha provided');
      }

      this.response.set(await this.fusio.getClientAnonymous().consumer().account().requestPasswordReset(this.data));
      this.loading.set(false);
    } catch (error) {
      this.loading.set(false);
      this.response.set(this.error.convert(error));
    }
  }

  setCaptcha(token: string) {
    this.data.captcha = token;
  }

}
