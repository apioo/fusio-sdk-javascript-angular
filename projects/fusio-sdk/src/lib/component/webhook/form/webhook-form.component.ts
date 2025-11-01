import {Component} from '@angular/core';
import {ConsumerWebhook} from "fusio-sdk";
import {ErrorService} from "../../../service/error.service";
import {Form} from "../../../abstract/form";
import {ActivatedRoute, Router} from "@angular/router";
import {WebhookService} from "../../../service/webhook.service";
import {EventService} from "../../../service/event.service";
import {MessageComponent} from "../../message/message.component";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {FormAutocompleteComponent} from "../../form/autocomplete/form-autocomplete.component";

@Component({
  selector: 'fusio-webhook-form',
  templateUrl: './webhook-form.component.html',
  imports: [
    MessageComponent,
    FormsModule,
    NgbPopover,
    FormAutocompleteComponent
  ],
  styleUrls: ['./webhook-form.component.css']
})
export class WebhookFormComponent extends Form<ConsumerWebhook> {

  constructor(private webhook: WebhookService, public event: EventService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): WebhookService {
    return this.webhook;
  }

}
