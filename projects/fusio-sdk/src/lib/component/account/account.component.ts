import {Component, OnInit, signal} from '@angular/core';
import {CommonMessage, ConsumerUserAccount} from "fusio-sdk";
import {ErrorService} from "../../service/error.service";
import {FusioService} from "../../service/fusio.service";
import {MessageComponent} from "../message/message.component";
import {FormsModule} from "@angular/forms";
import {GravatarModule} from "ngx-gravatar";

@Component({
  selector: 'fusio-account',
  templateUrl: './account.component.html',
  imports: [
    MessageComponent,
    FormsModule,
    GravatarModule
  ],
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user = signal<ConsumerUserAccount>({
    name: '',
    email: '',
    points: 0,
    scopes: [],
  });

  email = signal<string>('');

  response = signal<CommonMessage|undefined>(undefined);

  constructor(private fusio: FusioService, private error: ErrorService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.user.set(await this.fusio.getClient().consumer().account().get());

      this.email.set(this.user().email || '');

      this.response.set(undefined);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

  async doSave() {
    try {
      const model = this.user();
      if (!model.id) {
        return;
      }

      model.email = this.email();

      this.response.set(await this.fusio.getClient().consumer().account().update(model));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
