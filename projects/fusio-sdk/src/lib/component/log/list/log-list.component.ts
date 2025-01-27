import {Component} from '@angular/core';
import {List} from "../../../abstract/list";
import {ConsumerLog} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorService} from "../../../service/error.service";
import {LogService} from "../../../service/log.service";

@Component({
  selector: 'fusio-log-list',
  templateUrl: './log-list.component.html',
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
