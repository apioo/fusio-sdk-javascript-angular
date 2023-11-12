import {Component} from '@angular/core';
import {ConsumerEventSubscription} from "fusio-sdk/dist/src/ConsumerEventSubscription";
import {Client} from "fusio-sdk/dist/src/Client";
import {Modal} from "../../../abstract/modal";
import {CommonMessage} from "fusio-sdk/dist/src/CommonMessage";
import {ConsumerEvent} from "fusio-sdk/dist/src/ConsumerEvent";
import {ConsumerEventSubscriptionCreate} from "fusio-sdk/dist/src/ConsumerEventSubscriptionCreate";
import {ConsumerEventSubscriptionUpdate} from "fusio-sdk/dist/src/ConsumerEventSubscriptionUpdate";
import {FusioService} from "../../../service/fusio.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ErrorService} from "../../../service/error.service";

@Component({
  selector: 'fusio-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent extends Modal<Client, ConsumerEventSubscription> {

  events?: Array<ConsumerEvent>;

  constructor(fusio: FusioService, error: ErrorService, modalService: NgbModal, modal: NgbActiveModal) {
    super(fusio, error, modalService, modal);
  }

  override async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().consumer().event().getAll(0, 1024);
    this.events = response.entry;
  }

  protected async create(entity: ConsumerEventSubscription): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().subscription().create(<ConsumerEventSubscriptionCreate> entity);
  }

  protected async update(entity: ConsumerEventSubscription): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().subscription().update('' + entity.id, <ConsumerEventSubscriptionUpdate> entity);
  }

  protected async delete(entity: ConsumerEventSubscription): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().subscription().delete('' + entity.id);
  }

  protected newEntity(): ConsumerEventSubscription {
    return {
      event: '',
      endpoint: '',
    };
  }

}
