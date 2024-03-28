import {Component} from '@angular/core';
import {Client} from "fusio-sdk/dist/Client";
import {List} from "../../../abstract/list";
import {TokenModalComponent} from "../modal/token-modal.component";
import {ConsumerToken} from "fusio-sdk/dist/ConsumerToken";
import {ConsumerTokenCollection} from "fusio-sdk/dist/ConsumerTokenCollection";

@Component({
  selector: 'fusio-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.css']
})
export class TokenListComponent extends List<Client, ConsumerToken> {

  protected async getAll(parameters: Array<any>): Promise<ConsumerTokenCollection> {
    return this.fusio.getClient().consumer().token().getAll(...parameters);
  }

  protected async get(id: string): Promise<ConsumerToken> {
    return this.fusio.getClient().consumer().token().get('' + id);
  }

  protected getDetailComponent(): any {
    return TokenModalComponent;
  }

  protected getRoute(): any {
    return '/account/token';
  }

}
