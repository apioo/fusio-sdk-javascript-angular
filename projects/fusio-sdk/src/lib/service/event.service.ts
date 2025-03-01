import {Injectable} from '@angular/core';
import {CommonCollection, CommonMessage, ConsumerEvent} from "fusio-sdk";
import {FusioService} from "./fusio.service";
import {Service} from "../abstract/service";

@Injectable({
  providedIn: 'root'
})
export class EventService extends Service<ConsumerEvent> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<ConsumerEvent>> {
    return this.fusio.getClient().consumer().event().getAll(...parameters);
  }

  async get(id: string): Promise<ConsumerEvent> {
    return this.fusio.getClient().consumer().event().get(id);
  }

  async create(entity: ConsumerEvent): Promise<CommonMessage> {
    return {};
  }

  async update(entity: ConsumerEvent): Promise<CommonMessage> {
    return {};
  }

  async delete(entity: ConsumerEvent): Promise<CommonMessage> {
    return {};
  }

  newEntity(): ConsumerEvent {
    return {
      name: '',
    };
  }

  getLink(): Array<string> {
    return ['/', 'account', 'event'];
  }

}
