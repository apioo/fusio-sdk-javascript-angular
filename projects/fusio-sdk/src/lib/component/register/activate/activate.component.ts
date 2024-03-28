import {Component, OnInit} from '@angular/core';
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";
import {ActivatedRoute} from "@angular/router";
import {ConsumerUserActivate} from "fusio-sdk/dist/ConsumerUserActivate";
import {FusioService} from "../../../service/fusio.service";
import {EventService} from "../../../service/event.service";
import {ErrorService} from "../../../service/error.service";

@Component({
  selector: 'fusio-register-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  response?: CommonMessage;

  constructor(private fusio: FusioService, private event: EventService, private error: ErrorService, protected route: ActivatedRoute) {
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
      this.response = await this.fusio.getClientAnonymous().consumer().account().activate(activate);

      this.event.dispatchRegisterActivate();
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
