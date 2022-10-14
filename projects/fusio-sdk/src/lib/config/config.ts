import {InjectionToken} from "@angular/core";

export interface Config {
  baseUrl: string,
  homePath: string,
  paymentProvider: string,
  paymentCurrency: string,
  providers?: Array<Provider>,
  recaptcha?: string,
}

export interface Provider {
  name: string,
  icon: string,
  key: string
  url: string,
  params: Record<string, string>
}

export const FUSIO_CONFIG = new InjectionToken<Config>('FUSIO_CONFIG');
