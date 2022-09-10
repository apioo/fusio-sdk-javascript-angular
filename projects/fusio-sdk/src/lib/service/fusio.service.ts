import {Inject, Injectable} from '@angular/core';
import {TokenStoreInterface} from "sdkgen-client/dist/src/TokenStoreInterface";
import {SessionTokenStore} from "sdkgen-client/dist/src/TokenStore/SessionTokenStore";
import {ClientCredentials} from "sdkgen-client/dist/src/Credentials/ClientCredentials";
import {ClientAbstract, CredentialsInterface} from "sdkgen-client";
import {Config, FUSIO_CONFIG} from "../config/config";

@Injectable({
  providedIn: 'root'
})
export abstract class FusioService<T extends ClientAbstract> {

  private readonly baseUrl: string;
  private readonly store: TokenStoreInterface;

  constructor(@Inject(FUSIO_CONFIG) private config: Config) {
    let baseUrl = this.config.baseUrl;

    this.baseUrl = FusioService.normalizeBaseUrl(baseUrl);
    this.store = new SessionTokenStore();
  }

  public getClientWithCredentials(clientId: string, clientSecret: string): T {
    const credentials = new ClientCredentials(
      clientId,
      clientSecret,
      this.baseUrl + '/authorization/token',
      ''
    );

    return this.newClient(this.baseUrl, credentials, this.store);
  }

  public getClientAnonymous(): T {
    return this.newClient(this.baseUrl, null, this.store);
  }

  /**
   * This method should be normally used inside the app to obtain the client, we hope to get an access token from the
   * token store, if no token is available we have also no way to obtain an access token, in this case the client throws
   * an exception
   */
  public getClient(): T {
    const credentials = new ClientCredentials(
      '',
      '',
      this.baseUrl + '/authorization/token',
      ''
    );

    return this.newClient(this.baseUrl, credentials, this.store);
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public hasValidToken(): boolean {
    const token = this.store.get();
    if (!token) {
      return false;
    }

    const unixTimestamp = Math.floor(Date.now() / 1000);
    return token.expires_in > unixTimestamp;
  }

  public logout(): void {
    this.store.remove();
  }

  public hasScope(scope: string): boolean {
    const token = this.store.get();
    if (!token || !token.scope) {
      return false;
    }

    return token.scope.split(',').includes(scope);
  }

  protected abstract newClient(baseUrl: string, credentials?: CredentialsInterface | null, tokenStore?: TokenStoreInterface): T;

  private static normalizeBaseUrl(baseUrl: string): string {
    if (baseUrl.endsWith('/')) {
      return baseUrl.slice(0, -1)
    } else {
      return baseUrl;
    }
  }

}
