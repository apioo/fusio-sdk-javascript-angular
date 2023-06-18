import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {ActivatedRoute} from "@angular/router";
import {UserActivate} from "fusio-sdk/dist/src/generated/consumer/UserActivate";
import {ConsumerService} from "../../../service/consumer.service";
import {EventService} from "../../../service/event.service";
import {ErrorService} from "../../../service/error.service";

@Component({
  selector: 'fusio-register-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  response?: Message;

  constructor(private consumer: ConsumerService, private event: EventService, private error: ErrorService, protected route: ActivatedRoute) {
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
    let activate: UserActivate = {
      token: token
    };

    try {
      this.response = await this.consumer.getClientAnonymous().account().activate(activate);

      this.event.dispatchRegisterActivate();
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
