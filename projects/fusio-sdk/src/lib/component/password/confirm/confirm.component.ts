import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {ActivatedRoute} from "@angular/router";
import axios from "axios";
import {User_PasswordReset} from "fusio-sdk/dist/src/generated/consumer/User_PasswordReset";
import {ConsumerService} from "../../../service/consumer.service";
import {ErrorConverter} from "../../../util/error-converter";

@Component({
  selector: 'fusio-password-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  reset: User_PasswordReset = {
    token: '',
    newPassword: '',
  }

  passwordConfirm?: string;

  response?: Message;
  loading = false

  constructor(private consumer: ConsumerService, protected route: ActivatedRoute) {
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

      const client = this.consumer.getClientAnonymous();
      const account = await client.consumerUser();
      const response = await account.getConsumerPasswordReset().consumerActionUserResetPasswordExecute(this.reset);

      this.response = response.data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.response = ErrorConverter.convert(error);
    }
  }

}
