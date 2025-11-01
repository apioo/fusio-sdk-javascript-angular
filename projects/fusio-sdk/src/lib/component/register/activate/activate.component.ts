import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommonMessage, ConsumerUserActivate} from "fusio-sdk";
import {FusioService} from "../../../service/fusio.service";
import {EventService} from "../../../service/event.service";
import {ErrorService} from "../../../service/error.service";
import {MessageComponent} from "../../message/message.component";

@Component({
  selector: 'fusio-register-activate',
  templateUrl: './activate.component.html',
  imports: [
    MessageComponent
  ],
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  response = signal<CommonMessage|undefined>(undefined);

  constructor(private fusio: FusioService, private error: ErrorService, protected route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
   this.route.paramMap.subscribe(async params => {
      const token = params.get('token');
      if (token) {
        await this.activate(token);
      }
    });
  }

  private async activate(token: string) {
    let activate: ConsumerUserActivate = {
      token: token
    };

    try {
      this.response.set(await this.fusio.getClientAnonymous().consumer().account().activate(activate));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
