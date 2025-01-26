import {CommonCollection, CommonMessage, ConsumerWebhook, ConsumerWebhookCreate, ConsumerWebhookUpdate} from "fusio-sdk";
import {Injectable} from "@angular/core";
import {Service} from "../abstract/service";
import {FusioService} from "./fusio.service";

@Injectable({
  providedIn: 'root'
})
export class WebhookService extends Service<ConsumerWebhook> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<ConsumerWebhook>> {
    return this.fusio.getClient().consumer().webhook().getAll(...parameters);
  }

  async get(id: string): Promise<ConsumerWebhook> {
    return this.fusio.getClient().consumer().webhook().get(id);
  }

  async create(entity: ConsumerWebhook): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().webhook().create(<ConsumerWebhookCreate> entity);
  }

  async update(entity: ConsumerWebhook): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().webhook().update('' + entity.id, <ConsumerWebhookUpdate> entity);
  }

  async delete(entity: ConsumerWebhook): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().webhook().delete('' + entity.id);
  }

  newEntity(): ConsumerWebhook {
    return {
      event: '',
      endpoint: '',
    };
  }

  getLink(): Array<string> {
    return ['/', 'account', 'webhook'];
  }

}
