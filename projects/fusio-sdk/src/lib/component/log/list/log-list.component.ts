import {Component} from '@angular/core';
import {List} from "../../../abstract/list";
import {ConsumerLog} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ErrorService} from "../../../service/error.service";
import {LogService} from "../../../service/log.service";
import {SearchComponent} from "../../search/search.component";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'fusio-log-list',
  templateUrl: './log-list.component.html',
  imports: [
    SearchComponent,
    RouterLink,
    NgbPagination
  ],
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent extends List<ConsumerLog> {

  constructor(private log: LogService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): LogService {
    return this.log;
  }

}
