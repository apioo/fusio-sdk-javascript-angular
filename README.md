
# Fusio SDK Angular

The Angular SDK provides several components and services which help to integrate Fusio into
an Angular app.

## SDK

The SDK library provides a flexible way to build Angular apps using Fusio as backend.
It is used by many Fusio related apps i.e. the [backend](https://github.com/apioo/fusio-apps-backend)
and [developer](https://github.com/apioo/fusio-apps-developer) app.

To use this library in your project you need to create a custom `ApiService` which
extends from the `ApiService` in this SDK s.

```typescript
import { Injectable } from '@angular/core';
import {CredentialsInterface} from "sdkgen-client";
import {ApiService as Sdk} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/Client";

@Injectable({
  providedIn: 'root'
})
export class ApiService extends Sdk<Client> {

  protected newClient(baseUrl: string, credentials: CredentialsInterface | null | undefined): Client {
    return new Client(baseUrl, credentials);
  }

}

```

There we define which generated Client we use. In this example we use the generated Client for
our backend API but you can also use the Client for your own API. You can then use this
`ApiService` in every component. Then you also need to import the `FusioSdkModule` and
overwrite the `ApiService` with your custom implementation so that the internal SDK also
uses your `ApiService`.

```typescript
import {ApiService} from "./api.service";
import {FusioSdkModule, ApiService as SDK} from "ngx-fusio-sdk";

@NgModule({
  //...
  imports: [
    //...
    FusioSdkModule.forRoot({
      baseUrl: 'https://myapi.fusio.cloud',
    })
  ],
  providers: [
    {
      provide: SDK,
      useExisting: ApiService
    }
  ],
  //...
})
```
