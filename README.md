
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
    FusioSdkModule
  ],
  providers: [
    {provide: Sdk, useExisting: FusioService}
  ],
  //...
})
```

## Login

This component shows how you can build a [login controller](https://github.com/apioo/fusio-apps-developer/blob/master/src/app/login/login.component.ts).

```typescript
import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import axios from "axios";
import {UserService} from "ngx-fusio-sdk";
import {Router} from "@angular/router";
import {User_Account} from "fusio-sdk/dist/src/generated/consumer/User_Account";
import {FusioService} from "../fusio.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: Credentials = {
    username: '',
    password: ''
  }

  constructor(private fusio: FusioService, private user: UserService<User_Account>, private router: Router) {
  }

  async login() {
    try {
      const client = this.fusio.getClientWithCredentials(this.credentials.username, this.credentials.password);
      const account = await client.consumerUser();
      const response = await account.getConsumerAccount().consumerActionUserGet();

      this.user.login(response.data);

      this.router.navigate(['/account']).then(() => {
        location.reload();
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = {
          success: false,
          message: error.response.data.error_description || 'An unknown error occurred',
        };
      } else {
        this.response = {
          success: false,
          message: String(error),
        };
      }
    }
  }

}

interface Credentials {
  username: string,
  password: string
}
```

## Register

This component shows how you can build a [register controller](https://github.com/apioo/fusio-apps-developer/blob/master/src/app/register/register.component.ts).

```typescript
import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import axios from "axios";
import {User_Register} from "fusio-sdk/dist/src/generated/consumer/User_Register";
import {FusioService} from "../fusio.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials: User_Register = {
    name: '',
    email: '',
    password: '',
  }

  passwordConfirm?: string;
  response?: Message;

  constructor(private fusio: FusioService) {
  }

  async register() {
    try {
      if (this.credentials.password !== this.passwordConfirm) {
        throw new Error('The provided password does not match with the confirmation password');
      }

      const client = this.fusio.getClientAnonymous();
      const account = await client.consumerUser();
      const response = await account.getConsumerRegister().consumerActionUserRegister(this.credentials);

      this.response = response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = {
          success: false,
          message: error.response.data.message || 'An unknown error occurred',
        };
      } else {
        this.response = {
          success: false,
          message: String(error),
        };
      }
    }
  }

}
```
