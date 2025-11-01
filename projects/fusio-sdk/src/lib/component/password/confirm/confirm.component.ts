import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommonMessage, ConsumerUserPasswordReset} from "fusio-sdk";
import {FusioService} from "../../../service/fusio.service";
import {ErrorService} from "../../../service/error.service";
import {MessageComponent} from "../../message/message.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'fusio-password-confirm',
  templateUrl: './confirm.component.html',
  imports: [
    MessageComponent,
    FormsModule
  ],
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  reset: ConsumerUserPasswordReset = {
    token: '',
    newPassword: '',
  }

  passwordConfirm?: string;

  response = signal<CommonMessage|undefined>(undefined);
  loading = false

  constructor(private fusio: FusioService, private error: ErrorService, protected route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      const token = params.get('token');
      if (token) {
        this.reset.token = token;
      }
    });
  }

  public async doReset() {
    this.loading = true;

    try {
      if (this.reset.newPassword !== this.passwordConfirm) {
        throw new Error('The provided password does not match with the confirmation password');
      }

      this.response.set(await this.fusio.getClientAnonymous().consumer().account().executePasswordReset(this.reset));
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.response.set(this.error.convert(error));
    }
  }

}
