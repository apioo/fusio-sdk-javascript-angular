import {Component} from '@angular/core';
import {ConsumerLog} from "fusio-sdk";
import {Detail} from "../../../abstract/detail";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorService} from "../../../service/error.service";
import {LogService} from "../../../service/log.service";
import {DatePipe, JsonPipe} from "@angular/common";

@Component({
  selector: 'fusio-log-detail',
  templateUrl: './log-detail.component.html',
  imports: [
    DatePipe,
    JsonPipe
  ],
  styleUrls: ['./log-detail.component.css']
})
export class LogDetailComponent extends Detail<ConsumerLog> {

  constructor(private log: LogService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): LogService {
    return this.log;
  }

}
