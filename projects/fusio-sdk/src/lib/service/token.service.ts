import {CommonCollection, CommonMessage, ConsumerToken, ConsumerWebhookCreate, ConsumerWebhookUpdate} from "fusio-sdk";
import {Injectable} from "@angular/core";
import {ConsumerTokenAccessToken} from "fusio-sdk/dist";
import {Service} from "../abstract/service";
import {FusioService} from "./fusio.service";

@Injectable({
  providedIn: 'root'
})
export class TokenService extends Service<ConsumerToken> {

  token?: ConsumerTokenAccessToken

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<ConsumerToken>> {
    return this.fusio.getClient().consumer().token().getAll(...parameters);
  }

  async get(id: string): Promise<ConsumerToken> {
    return this.fusio.getClient().consumer().token().get(id);
  }

  async create(entity: ConsumerToken): Promise<CommonMessage> {
    this.token = await this.fusio.getClient().consumer().token().create(<ConsumerWebhookCreate> entity);
    return {
      success: true,
      message: 'Created token successfully'
    };
  }

  async update(entity: ConsumerToken): Promise<CommonMessage> {
    this.token = await this.fusio.getClient().consumer().token().update('' + entity.id, <ConsumerWebhookUpdate> entity);
    return {
      success: true,
      message: 'Updated token successfully'
    };
  }

  async delete(entity: ConsumerToken): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().token().delete('' + entity.id);
  }

  newEntity(): ConsumerToken {
    return {
      name: '',
      scopes: [],
    };
  }

  getLink(): Array<string> {
    return ['/', 'account', 'token'];
  }

  getToken(): ConsumerTokenAccessToken|undefined {
    return this.token;
  }

}
