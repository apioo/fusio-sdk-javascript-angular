import { Component, OnInit } from '@angular/core';
import {ConsumerService} from "../../../service/consumer.service";
import {ActivatedRoute} from "@angular/router";
import {Plan} from "fusio-sdk/dist/src/generated/consumer/Plan";
import {EventService} from "../../../service/event.service";
import {ErrorService} from "../../../service/error.service";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {ConfigService} from "../../../service/config.service";

@Component({
  selector: 'fusio-subscription-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  homePath?: string;
  plan?: Plan;
  response?: Message;

  constructor(private consumer: ConsumerService, private event: EventService, private error: ErrorService, private config: ConfigService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.homePath = this.config.getHomePath();

    this.route.paramMap.subscribe(async params => {
      const id = params.get('plan_id');
      if (id) {
        await this.loadPlan(id);
      }
    });
  }

  async loadPlan(id: string) {
    try {
      this.plan = await this.consumer.getClient().plan().get(id);

      this.event.dispatchPurchase(this.plan);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
