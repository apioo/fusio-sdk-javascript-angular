import {Component} from '@angular/core';
import {EventSubscription} from "fusio-sdk/dist/src/generated/consumer/EventSubscription";
import {Client} from "fusio-sdk/dist/src/generated/consumer/Client";
import {Modal} from "../../../abstract/modal";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {Event} from "fusio-sdk/dist/src/generated/consumer/Event";
import {EventSubscriptionCreate} from "fusio-sdk/dist/src/generated/consumer/EventSubscriptionCreate";
import {EventSubscriptionUpdate} from "fusio-sdk/dist/src/generated/consumer/EventSubscriptionUpdate";
import {ConsumerService} from "../../../service/consumer.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ErrorService} from "../../../service/error.service";

@Component({
  selector: 'fusio-event-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class EventModalComponent extends Modal<Client, EventSubscription> {

  events?: Array<Event>;

  constructor(fusio: ConsumerService, error: ErrorService, modalService: NgbModal, modal: NgbActiveModal) {
    super(fusio, error, modalService, modal);
  }

  override async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().event().getAll(0, 1024);
    this.events = response.entry;
  }

  protected async create(entity: EventSubscription): Promise<Message> {
    return this.fusio.getClient().subscription().create(<EventSubscriptionCreate> entity);
  }

  protected async update(entity: EventSubscription): Promise<Message> {
    return this.fusio.getClient().subscription().update('' + entity.id, <EventSubscriptionUpdate> entity);
  }

  protected async delete(entity: EventSubscription): Promise<Message> {
    return this.fusio.getClient().subscription().delete('' + entity.id);
  }

  protected newEntity(): EventSubscription {
    return {
      event: '',
      endpoint: '',
    };
  }

}
