import {Injectable} from '@angular/core';
import {ClientAbstract, CredentialsInterface, OAuth2, SessionTokenStore, TokenStoreInterface} from "sdkgen-client";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<T extends ClientAbstract> {

  private baseUrl: string;
  private store: TokenStoreInterface;

  constructor(private config: ConfigService) {
    this.baseUrl = '';
    this.store = new SessionTokenStore();
    this.reload();
  }

  public getClientWithCredentials(clientId: string, clientSecret: string): T {
    const credentials = new OAuth2(
      clientId,
      clientSecret,
      this.baseUrl + '/authorization/token',
      '',
      this.store
    );

    return this.newClient(this.baseUrl, credentials);
  }

  public getClientAnonymous(): T {
    return this.newClient(this.baseUrl, null);
  }

  /**
   * This method should be normally used inside the app to obtain the client, we hope to get an access token from the
   * token store, if no token is available we have also no way to obtain an access token, in this case the client throws
   * an exception
   */
  public getClient(): T {
    const credentials = new OAuth2(
      '',
      '',
      this.baseUrl + '/authorization/token',
      '',
      this.store
    );

    return this.newClient(this.baseUrl, credentials);
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public getTokenStore(): TokenStoreInterface {
    return this.store;
  }

  /**
   * Reloads all values from the config
   */
  public reload() {
    this.baseUrl = ApiService.normalizeBaseUrl(this.config.getBaseUrl());

    const instance = this.config.getInstance();
    if (instance !== undefined) {
      this.store = new SessionTokenStore('fusio_access_token_' + instance);
    } else {
      this.store = new SessionTokenStore('fusio_access_token');
    }
  }

  public hasValidToken(): boolean {
    const token = this.store.get();
    if (!token) {
      return false;
    }

    const unixTimestamp = Math.floor(Date.now() / 1000);
    return this.getExpiresInTimestamp(token.expires_in) > unixTimestamp;
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

  protected abstract newClient(baseUrl: string, credentials?: CredentialsInterface | null): T;

  private static normalizeBaseUrl(baseUrl: string): string {
    if (baseUrl.endsWith('/')) {
      return baseUrl.slice(0, -1)
    } else {
      return baseUrl;
    }
  }

  private getExpiresInTimestamp(expiresIn: number): number {
    const nowTimestamp = Math.floor(Date.now() / 1000);

    if (expiresIn < 529196400) {
      // in case the expires in is lower than 1986-10-09 we assume that the field represents the duration in seconds
      // otherwise it is probably a timestamp
      expiresIn = nowTimestamp + expiresIn;
    }

    return expiresIn;
  }
}
