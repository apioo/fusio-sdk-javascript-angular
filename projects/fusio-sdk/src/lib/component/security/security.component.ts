import {Component, OnInit} from '@angular/core';
import {FusioService} from "../../service/fusio.service";
import {BackendAccountChangePassword} from "fusio-sdk/dist/BackendAccountChangePassword";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";
import {ErrorService} from "../../service/error.service";

@Component({
  selector: 'fusio-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  credentials: BackendAccountChangePassword = {
    oldPassword: '',
    newPassword: '',
    verifyPassword: '',
  };
  response?: CommonMessage;

  constructor(private fusio: FusioService, private error: ErrorService) { }

  ngOnInit(): void {
  }

  async doSave() {
    try {
      if (!this.credentials) {
        return;
      }

      this.response = await this.fusio.getClient().consumer().account().changePassword(this.credentials);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
