
# Fusio SDK Angular

This SDK provides several components and services which help to integrate
Fusio into an existing Angular app.

## Setup

This SDK provides a flexible way to build Angular apps using Fusio as backend.
If you use this service in your project you need to create a custom `FusioService`
which extends from the `FusioService` in this SDK s.

```typescript
import {Injectable} from '@angular/core';
import {FusioService as Sdk} from "ngx-fusio-sdk";
import {CredentialsInterface, TokenStoreInterface} from "sdkgen-client";
import Client from "fusio-sdk/dist/src/generated/backend/Client";

@Injectable({
  providedIn: 'root'
})
export class FusioService extends Sdk<Client> {

  protected newClient(baseUrl: string, credentials: CredentialsInterface | null | undefined, tokenStore: TokenStoreInterface | undefined): Client {
    return new Client(baseUrl, credentials, tokenStore);
  }

}

```

There we define which generated Client we use. In this example we use the generated Client for our backend API
but you can also use the Client for your own API. You can then use this `FusioService` in every component.
Then you also need to import the `FusioSdkModule` and overwrite the `FusioService` with your
custom implementation so that the internal SDK also uses your `FusioService`.

```typescript
import {FusioService} from "./fusio.service";
import {FusioSdkModule, FusioService as Sdk} from "ngx-fusio-sdk";

@NgModule({
  //...
  imports: [
    //...
    FusioSdkModule.forRoot({
      baseUrl: 'https://myapi.fusio.cloud',
    })
  ],
  providers: [
    {provide: Sdk, useExisting: FusioService}
  ],
  //...
})
```
