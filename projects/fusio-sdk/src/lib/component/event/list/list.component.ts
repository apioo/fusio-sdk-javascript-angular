import {Component} from '@angular/core';
import {EventSubscription} from "fusio-sdk/dist/src/generated/consumer/EventSubscription";
import Client from "fusio-sdk/dist/src/generated/consumer/Client";
import {List} from "../../../abstract/list";
import {CollectionQuery} from "fusio-sdk/dist/src/generated/consumer/CollectionQuery";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/consumer/Collection";
import {ModalComponent} from "../modal/modal.component";
import {ConsumerService} from "../../../service/consumer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventService} from "../../../service/event.service";
import {ErrorService} from "../../../service/error.service";

@Component({
  selector: 'fusio-event-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, EventSubscription> {

  constructor(fusio: ConsumerService, route: ActivatedRoute, router: Router, event: EventService, error: ErrorService, modalService: NgbModal) {
    super(fusio, route, router, event, error, modalService);
  }

  protected async getAll(query: CollectionQuery): Promise<AxiosResponse<Collection<EventSubscription>>> {
    const subscription = await this.fusio.getClient().getConsumerSubscription();
    return await subscription.consumerActionEventSubscriptionGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<EventSubscription>> {
    const subscription = await this.fusio.getClient().getConsumerSubscriptionBySubscriptionId(id);
    return await subscription.consumerActionEventSubscriptionGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/account/event';
  }

}
