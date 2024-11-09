import { Injectable } from '@angular/core';
import {CredentialsInterface} from "sdkgen-client";
import {ApiService as SDK} from "../../projects/fusio-sdk/src/lib/service/api.service";
import {Client} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class ApiService extends SDK<Client> {

  protected newClient(baseUrl: string, credentials: CredentialsInterface | null | undefined): Client {
    return new Client(baseUrl, credentials);
  }

}
