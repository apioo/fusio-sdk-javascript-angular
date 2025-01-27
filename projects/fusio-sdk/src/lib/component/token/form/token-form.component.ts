import {Component} from '@angular/core';
import {ConsumerToken, ConsumerTokenAccessToken} from "fusio-sdk";
import {ErrorService} from "../../../service/error.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Form} from "../../../abstract/form";
import {TokenService} from "../../../service/token.service";
import {ScopeService} from "../../../service/scope.service";
import {error} from "ng-packagr/lib/utils/log";

@Component({
  selector: 'fusio-token-form',
  templateUrl: './token-form.component.html',
  styleUrls: ['./token-form.component.css']
})
export class TokenFormComponent extends Form<ConsumerToken> {

  accessToken?: ConsumerTokenAccessToken;

  constructor(private token: TokenService, public scope: ScopeService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TokenService {
    return this.token;
  }

  protected override onSubmit() {
    this.accessToken = this.token.getToken();
  }

}
