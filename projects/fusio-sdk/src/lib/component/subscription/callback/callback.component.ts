import { Component, OnInit } from '@angular/core';
import {FusioService} from "../../../service/fusio.service";
import {ActivatedRoute} from "@angular/router";
import {ConsumerPlan} from "fusio-sdk/dist/ConsumerPlan";
import {EventService} from "../../../service/event.service";
import {ErrorService} from "../../../service/error.service";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";
import {ConfigService} from "../../../service/config.service";

@Component({
  selector: 'fusio-subscription-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  homePath?: string;
  plan?: ConsumerPlan;
  response?: CommonMessage;

  constructor(private fusio: FusioService, private event: EventService, private error: ErrorService, private config: ConfigService, private route: ActivatedRoute) { }

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
      this.plan = await this.fusio.getClient().consumer().plan().get(id);

      this.event.dispatchPurchase(this.plan);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
