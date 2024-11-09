import {Component} from '@angular/core';
import {Client, ConsumerWebhook, ConsumerWebhookCollection} from "fusio-sdk";
import {List} from "../../../abstract/list";
import {WebhookModalComponent} from "../modal/webhook-modal.component";

@Component({
  selector: 'fusio-webhook-list',
  templateUrl: './webhook-list.component.html',
  styleUrls: ['./webhook-list.component.css']
})
export class WebhookListComponent extends List<Client, ConsumerWebhook> {

  protected async getAll(parameters: Array<any>): Promise<ConsumerWebhookCollection> {
    return this.fusio.getClient().consumer().webhook().getAll(...parameters);
  }

  protected async get(id: string): Promise<ConsumerWebhook> {
    return this.fusio.getClient().consumer().webhook().get('' + id);
  }

  protected getDetailComponent(): any {
    return WebhookModalComponent;
  }

  protected getRoute(): any {
    return '/account/webhook';
  }

}
