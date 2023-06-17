import {Injectable} from '@angular/core';
import {Client} from "fusio-sdk/dist/src/generated/consumer/Client";
import {CredentialsInterface} from "sdkgen-client";
import {FusioService} from "./fusio.service";

@Injectable({
  providedIn: 'root'
})
export class ConsumerService extends FusioService<Client> {

  protected newClient(baseUrl: string, credentials: CredentialsInterface | null | undefined): Client {
    return new Client(baseUrl, credentials);
  }

}
