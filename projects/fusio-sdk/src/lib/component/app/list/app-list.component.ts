import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConsumerApp} from "fusio-sdk";
import {List} from "../../../abstract/list";
import {ErrorService} from "../../../service/error.service";
import {AppService} from "../../../service/app.service";

@Component({
  selector: 'fusio-app-list',
  templateUrl: './app-list.component.html',
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
