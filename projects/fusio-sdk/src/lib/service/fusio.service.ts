import {Injectable} from '@angular/core';
import {Client} from "fusio-sdk";
import {CredentialsInterface} from "sdkgen-client";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class FusioService extends ApiService<Client> {

  protected newClient(baseUrl: string, credentials: CredentialsInterface | null | undefined): Client {
    return new Client(baseUrl, credentials);
  }

}
