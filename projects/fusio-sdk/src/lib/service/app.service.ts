import {CommonCollection, CommonMessage, ConsumerApp, ConsumerAppCreate, ConsumerAppUpdate} from "fusio-sdk";
import {Injectable} from "@angular/core";
import {Service} from "../abstract/service";
import {FusioService} from "./fusio.service";

@Injectable({
  providedIn: 'root'
})
export class AppService extends Service<ConsumerApp> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<ConsumerApp>> {
    return this.fusio.getClient().consumer().app().getAll(...parameters);
  }

  async get(id: string): Promise<ConsumerApp> {
    return this.fusio.getClient().consumer().app().get(id);
  }

  async create(entity: ConsumerApp): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().app().create(<ConsumerAppCreate> entity);
  }

  async update(entity: ConsumerApp): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().app().update('' + entity.id, <ConsumerAppUpdate> entity);
  }

  async delete(entity: ConsumerApp): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().app().delete('' + entity.id);
  }

  newEntity(): ConsumerApp {
    return {
      name: '',
      url: '',
      scopes: []
    };
  }

  getLink(): Array<string> {
    return ['/', 'account', 'app'];
  }

}
