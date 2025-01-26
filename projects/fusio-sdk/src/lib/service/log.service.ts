import {CommonCollection, CommonMessage, ConsumerLog} from "fusio-sdk";
import {Injectable} from "@angular/core";
import {Service} from "../abstract/service";
import {FusioService} from "./fusio.service";

@Injectable({
  providedIn: 'root'
})
export class LogService extends Service<ConsumerLog> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<ConsumerLog>> {
    return this.fusio.getClient().consumer().log().getAll(...parameters);
  }

  async get(id: string): Promise<ConsumerLog> {
    return this.fusio.getClient().consumer().log().get(id);
  }

  async create(entity: ConsumerLog): Promise<CommonMessage> {
    return {};
  }

  async update(entity: ConsumerLog): Promise<CommonMessage> {
    return {};
  }

  async delete(entity: ConsumerLog): Promise<CommonMessage> {
    return {};
  }

  newEntity(): ConsumerLog {
    return {};
  }

  getLink(): Array<string> {
    return ['/', 'account', 'log'];
  }

  protected override getNameKey(): string
  {
    return 'path';
  }

}
