import {Component} from '@angular/core';
import {App} from "fusio-sdk/dist/src/generated/consumer/App";
import {Client} from "fusio-sdk/dist/src/generated/consumer/Client";
import {Collection} from "fusio-sdk/dist/src/generated/consumer/Collection";
import {List} from "../../../abstract/list";
import {AppModalComponent} from "../modal/app-modal.component";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConsumerService} from "../../../service/consumer.service";
import {EventService} from "../../../service/event.service";
import {ErrorService} from "../../../service/error.service";

@Component({
  selector: 'fusio-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class AppListComponent extends List<Client, App> {

  constructor(fusio: ConsumerService, route: ActivatedRoute, router: Router, event: EventService, error: ErrorService, modalService: NgbModal) {
    super(fusio, route, router, event, error, modalService);
  }

  protected async getAll(parameters: Array<any>): Promise<Collection<App>> {
    return this.fusio.getClient().app().getAll(...parameters);
  }

  protected async get(id: string): Promise<App> {
    return this.fusio.getClient().app().get(id);
  }

  protected getDetailComponent(): any {
    return AppModalComponent;
  }

  protected getRoute(): any {
    return '/account/app';
  }

}
