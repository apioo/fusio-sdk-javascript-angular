import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import axios from "axios";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {ConsumerService} from "../../service/consumer.service";
import {ConfigService} from "../../service/config.service";
import {ClientException} from "sdkgen-client";
import {IdentityCollection} from "fusio-sdk/dist/src/generated/consumer/IdentityCollection";
import {LocationStrategy} from "@angular/common";
import {Identity} from "fusio-sdk/dist/src/generated/consumer/Identity";

@Component({
  selector: 'fusio-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: Credentials = {
    username: '',
    password: ''
  }

  response?: Message;
  loading = false;

  identity?: IdentityCollection;
  logo?: string;
  title: boolean = false;

  constructor(private consumer: ConsumerService, private router: Router, private location: LocationStrategy, private user: UserService, private config: ConfigService) {
  }

  async ngOnInit(): Promise<void> {
    this.identity = await this.consumer.getClientAnonymous().identity().getAll(this.config.getAppId());
    this.logo = this.config.getLogo();
    this.title = this.logo === undefined;
  }

  async login() {
    this.loading = true;

    try {
      const response = await this.consumer.getClientWithCredentials(this.credentials.username, this.credentials.password).account().get();

      this.user.login(response);

      this.router.navigate([this.config.getHomePath()]).then(() => {
        location.reload();
      });
    } catch (error) {
      this.loading = false;
      if (error instanceof ClientException) {
        this.response = {
          success: false,
          message: 'Could not authenticate',
        };
      } else if (axios.isAxiosError(error) && error.response)  {
        this.response = {
          success: false,
          message: error.response.data.error_description || 'An unknown error occurred',
        };
      } else {
        throw error;
      }
    }
  }

  public buildUrl(identity?: Identity): string {
    if (!identity || !identity.redirect) {
      return '';
    }

    const path = this.location.prepareExternalUrl(this.config.getLoginPath() + '/' + identity.id);
    const redirectUrl = location.origin + path;

    const url = new URL(identity.redirect);
    url.searchParams.append('redirect_uri', redirectUrl);

    return url.toString();
  }

}

interface Credentials {
  username: string,
  password: string
}
