import {Component} from '@angular/core';
import {ConsumerApp, ConsumerScope} from "fusio-sdk";
import {ErrorService} from "../../../service/error.service";
import {Form} from "../../../abstract/form";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../../service/app.service";
import {ScopeService} from "../../../service/scope.service";
import {MessageComponent} from "../../message/message.component";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {ScopeCategoriesComponent} from "../../scope-categories/scope-categories.component";

@Component({
  selector: 'fusio-app-form',
  templateUrl: './app-form.component.html',
  imports: [
    MessageComponent,
    FormsModule,
    NgbPopover,
    ScopeCategoriesComponent
  ],
  styleUrls: ['./app-form.component.css']
})
export class AppFormComponent extends Form<ConsumerApp> {

  constructor(private app: AppService, public scope: ScopeService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AppService {
    return this.app;
  }

}
