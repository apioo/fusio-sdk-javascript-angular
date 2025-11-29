import {Component, signal} from '@angular/core';
import {ConsumerToken, ConsumerTokenAccessToken} from "fusio-sdk";
import {ErrorService} from "../../../service/error.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Form, Mode} from "../../../abstract/form";
import {TokenService} from "../../../service/token.service";
import {ScopeService} from "../../../service/scope.service";
import {MessageComponent} from "../../message/message.component";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {ScopeCategoriesComponent} from "../../scope-categories/scope-categories.component";
import {ClipboardModule} from "ngx-clipboard";

@Component({
  selector: 'fusio-token-form',
  templateUrl: './token-form.component.html',
  imports: [
    MessageComponent,
    FormsModule,
    NgbPopover,
    ScopeCategoriesComponent,
    ClipboardModule
  ],
  styleUrls: ['./token-form.component.css']
})
export class TokenFormComponent extends Form<ConsumerToken> {

  accessToken = signal<ConsumerTokenAccessToken|undefined>(undefined);

  constructor(private token: TokenService, public scope: ScopeService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TokenService {
    return this.token;
  }

  protected override onSubmit() {
    if (this.mode === Mode.Create || this.mode === Mode.Update) {
      this.accessToken.set(this.token.getToken());
    } else {
      this.accessToken.set(undefined);
    }
  }

}
