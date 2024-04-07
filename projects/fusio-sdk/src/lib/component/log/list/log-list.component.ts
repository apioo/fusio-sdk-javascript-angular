import {Component} from '@angular/core';
import {Client} from "fusio-sdk/dist/Client";
import {List} from "../../../abstract/list";
import {ConsumerLog} from "fusio-sdk/dist/ConsumerLog";
import {ConsumerLogCollection} from "fusio-sdk/dist/ConsumerLogCollection";

@Component({
  selector: 'fusio-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent extends List<Client, ConsumerLog> {

  protected async getAll(parameters: Array<any>): Promise<ConsumerLogCollection> {
    return this.fusio.getClient().consumer().log().getAll(...parameters);
  }

  protected async get(id: string): Promise<ConsumerLog> {
    return this.fusio.getClient().consumer().log().get('' + id);
  }

  protected getDetailComponent(): any {
    return null;
  }

  protected getRoute(): any {
    return '/account/log';
  }

}
