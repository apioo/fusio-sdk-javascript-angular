import {Component} from '@angular/core';
import {Client, ConsumerLog, ConsumerLogCollection} from "fusio-sdk";
import {List} from "../../../abstract/list";

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
