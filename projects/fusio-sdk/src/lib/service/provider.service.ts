import {Inject, Injectable} from '@angular/core';
import {LocationStrategy} from "@angular/common";
import {Config, FUSIO_CONFIG, Provider} from "../config/config";

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  providers: Array<Provider> = [];

  constructor(private location: LocationStrategy, @Inject(FUSIO_CONFIG) private config: Config) {
    this.providers = this.getProviders();
  }

  public generateUrl(name: string): string {
    const provider = this.getProviderByName(name);
    if (!provider) {
      throw new Error('Login provider does not exist');
    }

    const state = this.generateState();
    const path = this.location.prepareExternalUrl('/login/' + provider.name);
    const redirectUrl = location.origin + path;

    let params: Record<string, string> = {};
    for (const [key, value] of Object.entries(provider.params)) {
      if (key === 'client_id') {
        params[value] = provider.key;
      } else if (key === 'redirect_uri') {
        params[value] = redirectUrl;
      } else if (key === 'state') {
        params[value] = state;
      } else {
        params[key] = value;
      }
    }

    sessionStorage.setItem(this.getSessionKey(provider.name), JSON.stringify({
      redirectUri: redirectUrl,
      state: state,
    }));

    return provider.url + '?' + this.buildQueryString(params);
  }

  public verifyRequest(name: string, state: string): Verification {
    const data = sessionStorage.getItem(this.getSessionKey(name));
    if (!data) {
      throw new Error('The given provider was not requested');
    }

    const provider = this.getProviderByName(name);
    if (!provider) {
      throw new Error('The given provider does not exist');
    }

    const session = JSON.parse(data);
    if (session.state !== state) {
      throw new Error('The provided state does not match');
    }

    return {
      clientId: provider.key,
      redirectUri: session.redirectUri,
    };
  }

  public getProviders(): Array<Provider> {
    return this.config.providers || [];
  }

  private getProviderByName(name: string): Provider|undefined {
    return this.providers.find((provider) => {
      return provider.name === name;
    })
  }

  private generateState(): string {
    return Math.random().toString(36).substring(2);
  }

  private buildQueryString(params: Record<string, string>): string {
    return Object.keys(params).map((key) => {
      return key + '=' + encodeURIComponent(params[key])
    }).join('&');
  }

  private getSessionKey(providerName: string): string {
    return 'fusio_login_' + providerName;
  }

}

export interface Verification {
  clientId: string,
  redirectUri: string,
}
