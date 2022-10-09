import {Component} from '@angular/core';
import {EventSubscription} from "fusio-sdk/dist/src/generated/consumer/EventSubscription";
import Client from "fusio-sdk/dist/src/generated/consumer/Client";
import {Modal} from "../../../abstract/modal";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {Event} from "fusio-sdk/dist/src/generated/consumer/Event";
import {EventSubscriptionCreate} from "fusio-sdk/dist/src/generated/consumer/EventSubscriptionCreate";
import {EventSubscriptionUpdate} from "fusio-sdk/dist/src/generated/consumer/EventSubscriptionUpdate";

@Component({
  selector: 'fusio-event-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, EventSubscription> {

  events?: Array<Event>;

  override async ngOnInit(): Promise<void> {
    const event = await this.fusio.getClient().getConsumerEvent();
    const response = await event.consumerActionEventGetAll({count: 1024});
    this.events = response.data.entry;
  }

  protected async create(entity: EventSubscription): Promise<AxiosResponse<Message>> {
    const subscription = await this.fusio.getClient().getConsumerSubscription();
    return await subscription.consumerActionEventSubscriptionCreate(<EventSubscriptionCreate> entity);
  }

  protected async update(entity: EventSubscription): Promise<AxiosResponse<Message>> {
    const subscription = await this.fusio.getClient().getConsumerSubscriptionBySubscriptionId('' + entity.id);
    return await subscription.consumerActionEventSubscriptionUpdate(<EventSubscriptionUpdate> entity);
  }

  protected async delete(entity: EventSubscription): Promise<AxiosResponse<Message>> {
    const subscription = await this.fusio.getClient().getConsumerSubscriptionBySubscriptionId('' + entity.id);
    return await subscription.consumerActionEventSubscriptionDelete();
  }

  protected newEntity(): EventSubscription {
    return {
      event: '',
      endpoint: '',
    };
  }

}
