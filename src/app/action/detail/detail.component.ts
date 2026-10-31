import {Component} from '@angular/core';
import {BackendAction} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {MessageComponent} from "../../../../projects/fusio-sdk/src/lib/component/message/message.component";
import {Detail} from "../../../../projects/fusio-sdk/src/lib/abstract/detail";
import {ActionService} from "../../service/action.service";
import {ErrorService} from "../../../../projects/fusio-sdk/src/lib/service/error.service";

@Component({
  selector: 'app-action-detail',
  templateUrl: './detail.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendAction> {

  constructor(private service: ActionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ActionService {
    return this.service;
  }

}
