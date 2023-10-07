import {Component} from '@angular/core';
import {EventSubscription} from "fusio-sdk/dist/src/generated/consumer/EventSubscription";
import {Client} from "fusio-sdk/dist/src/generated/consumer/Client";
import {List} from "../../../abstract/list";
import {Collection} from "fusio-sdk/dist/src/generated/consumer/Collection";
import {EventModalComponent} from "../modal/event-modal.component";
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
export class EventListComponent extends List<Client, EventSubscription> {

  constructor(fusio: ConsumerService, route: ActivatedRoute, router: Router, event: EventService, error: ErrorService, modalService: NgbModal) {
    super(fusio, route, router, event, error, modalService);
  }

  protected async getAll(parameters: Array<any>): Promise<Collection<EventSubscription>> {
    return this.fusio.getClient().subscription().getAll(...parameters);
  }

  protected async get(id: string): Promise<EventSubscription> {
    return this.fusio.getClient().subscription().get('' + id);
  }

  protected getDetailComponent(): any {
    return EventModalComponent;
  }

  protected getRoute(): any {
    return '/account/event';
  }

}
