import {Component} from '@angular/core';
import {ConsumerToken} from "fusio-sdk";
import {List} from "../../../abstract/list";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorService} from "../../../service/error.service";
import {TokenService} from "../../../service/token.service";

@Component({
  selector: 'fusio-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.css']
})
export class TokenListComponent extends List<ConsumerToken> {

  constructor(private token: TokenService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TokenService {
    return this.token;
  }

}
