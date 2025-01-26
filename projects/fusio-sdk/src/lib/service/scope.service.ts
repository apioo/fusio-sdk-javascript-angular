import {CommonCollection, CommonMessage, ConsumerLog, ConsumerScope} from "fusio-sdk";
import {Injectable} from "@angular/core";
import {Service} from "../abstract/service";
import {FusioService} from "./fusio.service";

@Injectable({
  providedIn: 'root'
})
export class ScopeService extends Service<ConsumerLog> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<ConsumerScope>> {
    return this.fusio.getClient().consumer().scope().getAll(...parameters);
  }

  async get(id: string): Promise<ConsumerScope> {
    return {};
  }

  async create(entity: ConsumerScope): Promise<CommonMessage> {
    return {};
  }

  async update(entity: ConsumerScope): Promise<CommonMessage> {
    return {};
  }

  async delete(entity: ConsumerScope): Promise<CommonMessage> {
    return {};
  }

  newEntity(): ConsumerScope {
    return {};
  }

  getLink(): Array<string> {
    return ['/', 'account', 'scope'];
  }

}
