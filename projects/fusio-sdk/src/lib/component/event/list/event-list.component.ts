import {Component} from '@angular/core';
import {ConsumerEventSubscription} from "fusio-sdk/dist/src/ConsumerEventSubscription";
import {Client} from "fusio-sdk/dist/src/Client";
import {List} from "../../../abstract/list";
import {CommonCollection} from "fusio-sdk/dist/src/CommonCollection";
import {EventModalComponent} from "../modal/event-modal.component";
import {FusioService} from "../../../service/fusio.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventService} from "../../../service/event.service";
import {ErrorService} from "../../../service/error.service";

@Component({
  selector: 'fusio-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent extends List<Client, ConsumerEventSubscription> {

  constructor(fusio: FusioService, route: ActivatedRoute, router: Router, event: EventService, error: ErrorService, modalService: NgbModal) {
    super(fusio, route, router, event, error, modalService);
  }

  protected async getAll(parameters: Array<any>): Promise<CommonCollection<ConsumerEventSubscription>> {
    return this.fusio.getClient().consumer().subscription().getAll(...parameters);
  }

  protected async get(id: string): Promise<ConsumerEventSubscription> {
    return this.fusio.getClient().consumer().subscription().get('' + id);
  }

  protected getDetailComponent(): any {
    return EventModalComponent;
  }

  protected getRoute(): any {
    return '/account/event';
  }

}
