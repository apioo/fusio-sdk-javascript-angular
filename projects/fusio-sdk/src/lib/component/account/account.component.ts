import {Component, OnInit} from '@angular/core';
import {CommonMessage, ConsumerUserAccount} from "fusio-sdk";
import {ErrorService} from "../../service/error.service";
import {FusioService} from "../../service/fusio.service";

@Component({
  selector: 'fusio-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user?: ConsumerUserAccount;
  response?: CommonMessage;
  email: string = '';

  constructor(private fusio: FusioService, private error: ErrorService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.fusio.getClient().consumer().account().get();
      this.email = this.user?.email || '';
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

      this.response = await this.fusio.getClient().consumer().account().update(this.user);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
