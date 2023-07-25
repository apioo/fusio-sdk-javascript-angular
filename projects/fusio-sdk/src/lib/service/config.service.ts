import {Inject, Injectable} from '@angular/core';
import {
  Config,
  EventListener,
  FUSIO_CONFIG,
} from "../config/config";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(@Inject(FUSIO_CONFIG) private config: Config) { }

  public getBaseUrl(): string {
    return this.config.baseUrl;
  }

  public getLogo(): string|undefined {
    return this.config.logo;
  }

  public getAppId(): number|undefined {
    return this.config.appId;
  }

  public getHomePath(): string {
    if (this.config.homePath) {
      return this.config.homePath;
    } else {
      return '/backend';
    }
  }

  public getLoginPath(): string {
    if (this.config.loginPath) {
      return this.config.loginPath;
    } else {
      return '/login';
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

  public getRecpatcha(): string|undefined {
    return this.config.recaptcha;
  }

  public getHelpUrl(): string|undefined {
    return this.config.helpUrl;
  }

  public getEventListener(): EventListener {
    if (this.config.on) {
      return this.config.on;
    } else {
      return {};
    }
  }

}
