import {Injectable} from '@angular/core';
import Client from "fusio-sdk/dist/src/generated/consumer/Client";
import {CredentialsInterface, TokenStoreInterface} from "sdkgen-client";
import {FusioService} from "./fusio.service";

@Injectable({
  providedIn: 'root'
})
export class ConsumerService extends FusioService<Client> {

  protected newClient(baseUrl: string, credentials: CredentialsInterface | null | undefined, tokenStore: TokenStoreInterface | undefined): Client {
    return new Client(baseUrl, credentials, tokenStore);
  }

}
