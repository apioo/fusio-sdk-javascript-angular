import {Component} from '@angular/core';
import {ConsumerApp} from "fusio-sdk";
import {Detail} from "../../../abstract/detail";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorService} from "../../../service/error.service";
import {AppService} from "../../../service/app.service";

@Component({
  selector: 'fusio-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.css']
})
export class AppDetailComponent extends Detail<ConsumerApp> {

  hideSecret = true;

  constructor(private app: AppService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AppService {
    return this.app;
  }

}
