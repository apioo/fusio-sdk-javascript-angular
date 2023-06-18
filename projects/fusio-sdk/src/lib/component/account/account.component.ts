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
      this.user = await this.consumer.getClient().account().get();
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

      this.response = await this.consumer.getClient().account().update(this.user);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
