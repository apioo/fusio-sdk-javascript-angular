import { Component, OnInit } from '@angular/core';
import {ConsumerService} from "../../service/consumer.service";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {UserAccount} from "fusio-sdk/dist/src/generated/consumer/UserAccount";
import {ErrorConverter} from "../../util/error-converter";

@Component({
  selector: 'fusio-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user?: UserAccount;
  response?: Message;
  email: string = '';

  constructor(private consumer: ConsumerService) { }

  async ngOnInit(): Promise<void> {
    try {
      const account = await this.consumer.getClient().getConsumerAccount();
      const response = await account.consumerActionUserGet();

      this.user = response.data;
      this.email = this.user.email || '';
      this.response = undefined;
    } catch (error) {
      this.response = ErrorConverter.convert(error);
    }
  }

  async doSave() {
    try {
      if (!this.user) {
        return;
      }

      const account = await this.consumer.getClient().getConsumerAccount();
      const response = await account.consumerActionUserUpdate(this.user);

      this.response = response.data;
    } catch (error) {
      this.response = ErrorConverter.convert(error);
    }
  }

}
