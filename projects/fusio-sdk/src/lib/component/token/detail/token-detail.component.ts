import {Component} from '@angular/core';
import {ConsumerToken} from "fusio-sdk";
import {Detail} from "../../../abstract/detail";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorService} from "../../../service/error.service";
import {TokenService} from "../../../service/token.service";

@Component({
  selector: 'fusio-token-detail',
  templateUrl: './token-detail.component.html',
  styleUrls: ['./token-detail.component.css']
})
export class TokenDetailComponent extends Detail<ConsumerToken> {

  constructor(private token: TokenService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TokenService {
    return this.token;
  }

}
