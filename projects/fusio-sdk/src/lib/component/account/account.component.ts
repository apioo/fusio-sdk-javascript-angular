import {Component, OnInit} from '@angular/core';
import {ConsumerService} from "../../service/consumer.service";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {UserAccount} from "fusio-sdk/dist/src/generated/consumer/UserAccount";
import {ErrorService} from "../../service/error.service";

@Component({
  selector: 'fusio-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user?: UserAccount;
  response?: Message;
  email: string = '';

  constructor(private consumer: ConsumerService, private error: ErrorService) { }

  async ngOnInit(): Promise<void> {
    try {
      const account = await this.consumer.getClient().getConsumerAccount();
      const response = await account.consumerActionUserGet();

      this.user = response.data;
      this.email = this.user.email || '';
      this.response = undefined;
    } catch (error) {
      this.response = this.error.convert(error);
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
      this.response = this.error.convert(error);
    }
  }

}
