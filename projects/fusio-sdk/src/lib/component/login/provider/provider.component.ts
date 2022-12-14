import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {SessionTokenStore} from "sdkgen-client";
import {AccessToken} from "sdkgen-client/dist/src/AccessToken";
import {ActivatedRoute, Router} from "@angular/router";
import {ProviderService} from "../../../service/provider.service";
import {UserService} from "../../../service/user.service";
import {ConsumerService} from "../../../service/consumer.service";
import {ErrorService} from "../../../service/error.service";
import {ConfigService} from "../../../service/config.service";

@Component({
  selector: 'fusio-login-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  response?: Message;

  constructor(private consumer: ConsumerService, private router: Router, private user: UserService, protected route: ActivatedRoute, private provider: ProviderService, private error: ErrorService, private config: ConfigService) { }

  async ngOnInit(): Promise<void> {
    const provider = this.route.snapshot.paramMap.get('provider');
    const code = this.route.snapshot.queryParams['code'];
    const state = this.route.snapshot.queryParams['state'];

    if (provider && code) {
      await this.obtainAccessToken(provider, code, state);
    } else {
      this.response = {
        success: false,
        message: 'Missing credentials',
      };
    }
  }

  private async obtainAccessToken(providerName: string, code: string, state: string) {
    try {
      const verification = this.provider.verifyRequest(providerName, state);

      const resource = await this.consumer.getClientAnonymous().getConsumerProviderByProvider(providerName);
      const response = await resource.consumerActionUserProvider({
        code: code,
        clientId: verification.clientId,
        redirectUri: verification.redirectUri,
      });

      if (!response.data.token) {
        throw new Error('Could not obtain access token');
      }

      const token: AccessToken = {
        token_type: 'bearer',
        access_token: response.data.token,
        expires_in: response.data.expires_in || 0,
        refresh_token: response.data.refresh_token || '',
        scope: response.data.scope || '',
      };

      const store = new SessionTokenStore();
      store.persist(token);

      await this.obtainUserInfo();
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  private async obtainUserInfo() {
    const resource = await this.consumer.getClient().getConsumerAccount();
    const response = await resource.consumerActionUserGet();

    this.user.login(response.data);

    this.router.navigate([this.config.getHomePath()]).then(() => {
      location.reload();
    });
  }

}
