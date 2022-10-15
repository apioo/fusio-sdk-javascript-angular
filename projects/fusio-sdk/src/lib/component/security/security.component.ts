import {Component, OnInit} from '@angular/core';
import {ConsumerService} from "../../service/consumer.service";
import {AccountChangePassword} from "fusio-sdk/dist/src/generated/consumer/AccountChangePassword";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {ErrorService} from "../../service/error.service";

@Component({
  selector: 'fusio-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  credentials: AccountChangePassword = {
    oldPassword: '',
    newPassword: '',
    verifyPassword: '',
  };
  response?: Message;

  constructor(private consumer: ConsumerService, private error: ErrorService) { }

  ngOnInit(): void {
  }

  async doSave() {
    try {
      if (!this.credentials) {
        return;
      }

      const password = await this.consumer.getClient().getConsumerAccountChangePassword();
      const response = await password.consumerActionUserChangePassword(this.credentials);

      this.response = response.data;
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
