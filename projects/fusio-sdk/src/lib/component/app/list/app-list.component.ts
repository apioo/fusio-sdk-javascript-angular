import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ConsumerApp} from "fusio-sdk";
import {List} from "../../../abstract/list";
import {ErrorService} from "../../../service/error.service";
import {AppService} from "../../../service/app.service";
import {SearchComponent} from "../../search/search.component";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'fusio-app-list',
  templateUrl: './app-list.component.html',
  imports: [
    SearchComponent,
    RouterLink,
    NgbPagination
  ],
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent extends List<ConsumerApp> {

  constructor(private app: AppService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AppService {
    return this.app;
  }

}
