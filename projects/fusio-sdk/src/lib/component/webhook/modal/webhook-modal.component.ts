import {Component} from '@angular/core';
import {Client, CommonMessage, ConsumerEvent, ConsumerWebhook, ConsumerWebhookCreate, ConsumerWebhookUpdate} from "fusio-sdk";
import {Modal} from "../../../abstract/modal";
import {FusioService} from "../../../service/fusio.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ErrorService} from "../../../service/error.service";

@Component({
  selector: 'fusio-webhook-modal',
  templateUrl: './webhook-modal.component.html',
  styleUrls: ['./webhook-modal.component.css']
})
export class WebhookModalComponent extends Modal<Client, ConsumerWebhook> {

  events?: Array<ConsumerEvent>;

  constructor(fusio: FusioService, error: ErrorService, modalService: NgbModal, modal: NgbActiveModal) {
    super(fusio, error, modalService, modal);
  }

  override async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().consumer().event().getAll(0, 1024);
    this.events = response.entry;
  }

  protected async create(entity: ConsumerWebhook): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().webhook().create(<ConsumerWebhookCreate> entity);
  }

  protected async update(entity: ConsumerWebhook): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().webhook().update('' + entity.id, <ConsumerWebhookUpdate> entity);
  }

  protected async delete(entity: ConsumerWebhook): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().webhook().delete('' + entity.id);
  }

  protected newEntity(): ConsumerWebhook {
    return {
      event: '',
      endpoint: '',
    };
  }

}
