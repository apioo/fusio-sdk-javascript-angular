import {Component, OnInit} from '@angular/core';
import {CommonMessage} from "fusio-sdk";
import {AccessToken, SessionTokenStore} from "sdkgen-client";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {FusioService} from "../../../service/fusio.service";
import {ErrorService} from "../../../service/error.service";
import {ConfigService} from "../../../service/config.service";

@Component({
  selector: 'fusio-login-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  response?: CommonMessage;

  constructor(private fusio: FusioService, private router: Router, private user: UserService, protected route: ActivatedRoute, private error: ErrorService, private config: ConfigService) { }

  async ngOnInit(): Promise<void> {
    const accessToken = this.route.snapshot.queryParams['access_token'];
    const tokenType = this.route.snapshot.queryParams['token_type'];
    const expiresIn = parseInt(this.route.snapshot.queryParams['expires_in']);
    const refreshToken = this.route.snapshot.queryParams['refresh_token'];
    const scope = this.route.snapshot.queryParams['scope'];

    if (accessToken && expiresIn) {
      const token: AccessToken = {
        token_type: tokenType,
        access_token: accessToken,
        expires_in: expiresIn || 0,
        refresh_token: refreshToken || '',
        scope: scope || '',
      };

      const store = new SessionTokenStore();
      store.persist(token);

      await this.obtainUserInfo();
    } else {
      this.response = {
        success: false,
        message: 'Missing credentials',
      };
    }
  }

  private async obtainUserInfo() {
    const response = await this.fusio.getClient().consumer().account().get();

    this.user.login(response);

    this.router.navigate([this.config.getHomePath()]).then(() => {
      location.reload();
    });
  }

}
