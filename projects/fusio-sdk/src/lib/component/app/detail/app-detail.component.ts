import {Component} from '@angular/core';
import {ConsumerApp} from "fusio-sdk";
import {Detail} from "../../../abstract/detail";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ErrorService} from "../../../service/error.service";
import {AppService} from "../../../service/app.service";
import {ClipboardModule} from "ngx-clipboard";
import {ScopesComponent} from "../../scopes/scopes.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'fusio-app-detail',
  templateUrl: './app-detail.component.html',
  imports: [
    RouterLink,
    ClipboardModule,
    ScopesComponent,
    DatePipe
  ],
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
