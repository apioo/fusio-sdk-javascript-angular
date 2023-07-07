import {Inject, Injectable} from '@angular/core';
import {
  BackendConfig,
  Config,
  FaqConfig,
  FUSIO_CONFIG,
  HomeConfig,
  PricingConfig
} from "../config/config";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(@Inject(FUSIO_CONFIG) private config: Config) { }

  public getLogo(): string|undefined {
    return this.config.logo;
  }

  public getApiUrl(): string|undefined {
    return this.config.apiUrl;
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

  public getImprintUrl(): string|undefined {
    return this.config.imprintUrl;
  }

}
