import {Component} from '@angular/core';
import {Detail} from "../../../abstract/detail";
import {ConsumerWebhook} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ErrorService} from "../../../service/error.service";
import {WebhookService} from "../../../service/webhook.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'fusio-webhook-detail',
  templateUrl: './webhook-detail.component.html',
  imports: [
    RouterLink,
    DatePipe
  ],
  styleUrls: ['./webhook-detail.component.css']
})
export class WebhookDetailComponent extends Detail<ConsumerWebhook> {

  constructor(private webhook: WebhookService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): WebhookService {
    return this.webhook;
  }

}
