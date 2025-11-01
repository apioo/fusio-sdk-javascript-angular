import {Component, OnInit, signal} from '@angular/core';
import {BackendAccountChangePassword, CommonMessage} from "fusio-sdk";
import {FusioService} from "../../service/fusio.service";
import {ErrorService} from "../../service/error.service";
import {MessageComponent} from "../message/message.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'fusio-security',
  templateUrl: './security.component.html',
  imports: [
    MessageComponent,
    FormsModule
  ],
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  credentials: BackendAccountChangePassword = {
    oldPassword: '',
    newPassword: '',
    verifyPassword: '',
  };

  response = signal<CommonMessage|undefined>(undefined);

  constructor(private fusio: FusioService, private error: ErrorService) { }

  ngOnInit(): void {
  }

  async doSave() {
    try {
      if (!this.credentials) {
        return;
      }

      this.response.set(await this.fusio.getClient().consumer().account().changePassword(this.credentials));

      if (this.response()?.success === true) {
        this.credentials = {
          oldPassword: '',
          newPassword: '',
          verifyPassword: '',
        };
      }
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
