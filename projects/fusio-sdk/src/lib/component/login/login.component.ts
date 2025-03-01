import {Component, OnInit} from '@angular/core';
import {CommonMessage, CommonMessageException, ConsumerIdentity} from "fusio-sdk";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {FusioService} from "../../service/fusio.service";
import {ConfigService} from "../../service/config.service";
import {ClientException} from "sdkgen-client";
import {LocationStrategy} from "@angular/common";

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

  response?: CommonMessage;
  loading = false;

  logo?: string;
  title: boolean = false;

  identityCount: number = 0;
  identityCollection: Array<ConsumerIdentity> = [];

  constructor(private fusio: FusioService, private router: Router, private location: LocationStrategy, private user: UserService, private config: ConfigService) {
  }

  async ngOnInit(): Promise<void> {
    this.logo = this.config.getLogo();
    this.title = this.logo === undefined;

    const collection = await this.fusio.getClientAnonymous().consumer().identity().getAll(this.config.getAppId(), this.config.getAppKey());
    this.identityCount = collection.totalResults || 0;
    this.identityCollection = collection.entry || [];
  }

  async login() {
    this.loading = true;

    try {
      const response = await this.fusio.getClientWithCredentials(this.credentials.username, this.credentials.password).consumer().account().get();

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
      } else if (error instanceof CommonMessageException) {
        this.response = error;
      } else {
        this.response = {
          success: false,
          message: String(error),
        };
      }
    }
  }

  public buildUrl(identity?: ConsumerIdentity): string {
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
