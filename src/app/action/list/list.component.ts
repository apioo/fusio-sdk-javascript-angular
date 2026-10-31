import {Component} from '@angular/core';
import {BackendAction} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageComponent} from "../../../../projects/fusio-sdk/src/lib/component/message/message.component";
import {SearchComponent} from "../../../../projects/fusio-sdk/src/lib/component/search/search.component";
import {List} from "../../../../projects/fusio-sdk/src/lib/abstract/list";
import {ActionService} from "../../service/action.service";
import {ErrorService} from "../../../../projects/fusio-sdk/src/lib/service/error.service";

@Component({
  selector: 'app-action-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    NgbPagination,
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendAction> {

  constructor(private service: ActionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ActionService {
    return this.service;
  }

}
