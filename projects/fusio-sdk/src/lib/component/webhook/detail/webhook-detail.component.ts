import {Component} from '@angular/core';
import {Detail} from "../../../abstract/detail";
import {ConsumerWebhook} from "fusio-sdk/dist/ConsumerWebhook";

@Component({
  selector: 'fusio-webhook-detail',
  templateUrl: './webhook-detail.component.html',
  styleUrls: ['./webhook-detail.component.css']
})
export class WebhookDetailComponent extends Detail<ConsumerWebhook> {

}
