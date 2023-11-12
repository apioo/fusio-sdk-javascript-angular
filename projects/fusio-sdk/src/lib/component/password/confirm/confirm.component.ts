import {Component, OnInit} from '@angular/core';
import {CommonMessage} from "fusio-sdk/dist/src/CommonMessage";
import {ActivatedRoute} from "@angular/router";
import {ConsumerUserPasswordReset} from "fusio-sdk/dist/src/ConsumerUserPasswordReset";
import {FusioService} from "../../../service/fusio.service";
import {ErrorService} from "../../../service/error.service";

@Component({
  selector: 'fusio-password-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  reset: ConsumerUserPasswordReset = {
    token: '',
    newPassword: '',
  }

  passwordConfirm?: string;

  response?: CommonMessage;
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

      this.response = await this.fusio.getClientAnonymous().consumer().account().executePasswordReset(this.reset);
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.response = this.error.convert(error);
    }
  }

}
