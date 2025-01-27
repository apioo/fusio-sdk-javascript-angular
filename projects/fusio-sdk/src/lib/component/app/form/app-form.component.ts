import {Component} from '@angular/core';
import {ConsumerApp, ConsumerScope} from "fusio-sdk";
import {ErrorService} from "../../../service/error.service";
import {Form} from "../../../abstract/form";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../../service/app.service";
import {ScopeService} from "../../../service/scope.service";

@Component({
  selector: 'fusio-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css']
})
export class AppFormComponent extends Form<ConsumerApp> {

  scopes?: Array<ConsumerScope>;

  constructor(private app: AppService, public scope: ScopeService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AppService {
    return this.app;
  }

}
