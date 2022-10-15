import {Component} from '@angular/core';
import {App} from "fusio-sdk/dist/src/generated/consumer/App";
import Client from "fusio-sdk/dist/src/generated/consumer/Client";
import {CollectionQuery} from "fusio-sdk/dist/src/generated/consumer/CollectionQuery";
import {Collection} from "fusio-sdk/dist/src/generated/consumer/Collection";
import {List} from "../../../abstract/list";
import {AxiosResponse} from "axios";
import {ModalComponent} from "../modal/modal.component";
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
export class ListComponent extends List<Client, App> {

  constructor(fusio: ConsumerService, route: ActivatedRoute, router: Router, modalService: NgbModal, event: EventService, error: ErrorService) {
    super(fusio, route, router, modalService, event, error);
  }

  protected async getAll(query: CollectionQuery): Promise<AxiosResponse<Collection<App>>> {
    const app = await this.fusio.getClient().getConsumerApp();
    return await app.consumerActionAppGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<App>> {
    const app = await this.fusio.getClient().getConsumerAppByAppId(id);
    return await app.consumerActionAppGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/account/app';
  }

}
