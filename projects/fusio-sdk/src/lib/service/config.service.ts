import {Inject, Injectable} from '@angular/core';
import {Config, EventListener, FUSIO_CONFIG, Provider} from "../config/config";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(@Inject(FUSIO_CONFIG) private config: Config) { }

  public getBaseUrl(): string {
    return this.config.baseUrl;
  }

  public getHomePath(): string {
    if (this.config.homePath) {
      return this.config.homePath;
    } else {
      return '/account';
    }
  }

  public getPaymentProvider(): string {
    if (this.config.paymentProvider) {
      return this.config.paymentProvider;
    } else {
      return 'stripe';
    }
  }

  public getPaymentCurrency(): string {
    if (this.config.paymentCurrency) {
      return this.config.paymentCurrency;
    } else {
      return 'EUR';
    }
  }

  public getProviders(): Array<Provider> {
    if (this.config.providers) {
      return this.config.providers;
    } else {
      return [];
    }
  }

  public getRecpatcha(): string|undefined {
    return this.config.recaptcha;
  }

  public getHelpUrl(): string|undefined {
    if (this.config.helpUrl) {
      return this.config.helpUrl;
    } else {
      return 'https://docs.fusio-project.org/docs/backend/';
    }
  }

  public getEventListener(): EventListener {
    if (this.config.on) {
      return this.config.on;
    } else {
      return {};
    }
  }

}
