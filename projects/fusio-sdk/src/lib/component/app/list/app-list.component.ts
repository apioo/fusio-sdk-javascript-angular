import {Component} from '@angular/core';
import {ConsumerApp} from "fusio-sdk/dist/ConsumerApp";
import {Client} from "fusio-sdk/dist/Client";
import {CommonCollection} from "fusio-sdk/dist/CommonCollection";
import {List} from "../../../abstract/list";
import {AppModalComponent} from "../modal/app-modal.component";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FusioService} from "../../../service/fusio.service";
import {EventService} from "../../../service/event.service";
import {ErrorService} from "../../../service/error.service";

@Component({
  selector: 'fusio-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent extends List<Client, ConsumerApp> {

  constructor(fusio: FusioService, route: ActivatedRoute, router: Router, event: EventService, error: ErrorService, modalService: NgbModal) {
    super(fusio, route, router, event, error, modalService);
  }

  protected async getAll(parameters: Array<any>): Promise<CommonCollection<ConsumerApp>> {
    return this.fusio.getClient().consumer().app().getAll(...parameters);
  }

  protected async get(id: string): Promise<ConsumerApp> {
    return this.fusio.getClient().consumer().app().get(id);
  }

  protected getDetailComponent(): any {
    return AppModalComponent;
  }

  protected getRoute(): any {
    return '/account/app';
  }

}
