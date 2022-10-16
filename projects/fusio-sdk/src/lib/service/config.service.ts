import {Inject, Injectable} from '@angular/core';
import {
  BackendConfig,
  Config,
  EventListener,
  FaqConfig,
  FUSIO_CONFIG,
  HomeConfig,
  PricingConfig,
  Provider
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

  public getHomePath(): string {
    if (this.config.homePath) {
      return this.config.homePath;
    } else {
      return '/backend';
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

  public getHomeConfig(): HomeConfig|undefined {
    return this.config.home;
  }

  public getPricingConfig(): PricingConfig|undefined {
    return this.config.pricing;
  }

  public getFaqConfig(): FaqConfig|undefined {
    return this.config.faq;
  }

  public getBackendConfig(): BackendConfig|undefined {
    return this.config.backend;
  }

}
