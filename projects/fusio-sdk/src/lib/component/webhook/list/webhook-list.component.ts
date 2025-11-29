import {Component} from '@angular/core';
import {ConsumerWebhook} from "fusio-sdk";
import {List} from "../../../abstract/list";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorService} from "../../../service/error.service";
import {WebhookService} from "../../../service/webhook.service";
import {SearchComponent} from "../../search/search.component";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'fusio-webhook-list',
  templateUrl: './webhook-list.component.html',
  imports: [
    SearchComponent,
    NgbPagination
  ],
  styleUrls: ['./webhook-list.component.css']
})
export class WebhookListComponent extends List<ConsumerWebhook> {

  constructor(private webhook: WebhookService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): WebhookService {
    return this.webhook;
  }

}
