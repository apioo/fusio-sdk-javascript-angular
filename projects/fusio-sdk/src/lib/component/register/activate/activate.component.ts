import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {ActivatedRoute} from "@angular/router";
import axios from "axios";
import {UserActivate} from "fusio-sdk/dist/src/generated/consumer/UserActivate";
import {ConsumerService} from "../../../service/consumer.service";
import {ErrorConverter} from "../../../util/error-converter";

@Component({
  selector: 'fusio-register-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  response?: Message;

  constructor(private consumer: ConsumerService, protected route: ActivatedRoute) {
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
      const client = this.consumer.getClientAnonymous();
      const resource = await client.getConsumerActivate();
      const response = await resource.consumerActionUserActivate(activate);

      this.response = response.data;
    } catch (error) {
      this.response = ErrorConverter.convert(error);
    }
  }

}
