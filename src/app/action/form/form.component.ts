import {Component, signal} from '@angular/core';
import {BackendAction, BackendActionIndexEntry, CommonFormContainer} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal, NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {MessageComponent} from "../../../../projects/fusio-sdk/src/lib/component/message/message.component";
import {ActionService} from "../../service/action.service";
import {ErrorService} from "../../../../projects/fusio-sdk/src/lib/service/error.service";
import {Form} from "../../../../projects/fusio-sdk/src/lib/abstract/form";
import {
  FormBreadcrumbComponent
} from "../../../../projects/fusio-sdk/src/lib/component/form/breadcrumb/form-breadcrumb.component";
import {
  FormButtonsComponent
} from "../../../../projects/fusio-sdk/src/lib/component/form/buttons/form-buttons.component";

@Component({
  selector: 'app-action-modal',
  templateUrl: './form.component.html',
  imports: [
    MessageComponent,
    FormsModule,
    NgbPopover,
    FormBreadcrumbComponent,
    FormButtonsComponent,
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendAction> {

  actions = signal<Array<BackendActionIndexEntry>>([]);
  form = signal<CommonFormContainer|undefined>(undefined);
  custom = signal<boolean>(false);

  constructor(private service: ActionService, private modal: NgbModal, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ActionService {
    return this.service;
  }

}
