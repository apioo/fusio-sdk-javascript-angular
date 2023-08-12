import {Inject, Injectable} from '@angular/core';
import {
  Config,
  EventListener,
  FUSIO_CONFIG,
} from "../config/config";
import {GroupItem, Item} from "./navigation.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(@Inject(FUSIO_CONFIG) private config: Config) { }

  public getBaseUrl(): string {
    return this.config.baseUrl;
  }

  public getTitle(): string|undefined {
    return this.config.title;
  }

  public getVersion(): string|undefined {
    return this.config.version;
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

  public getNavigation(): Array<GroupItem> {
    return this.config.navigation || [];
  }

  public getUserNavigation(): Array<Item> {
    return this.config.userNavigation || [{
      title: 'Account',
      path: '/account'
    }, {
      title: 'Logout',
      path: '/logout',
    }];
  }

  public getAccountNavigation(): Array<Item> {
    return this.config.accountNavigation || [{
      title: 'Account',
      path: '/account',
      scope: 'consumer.account',
    }, {
      title: 'Security',
      path: '/account/security',
      scope: 'consumer.account',
    }, {
      title: 'Apps',
      path: '/account/app',
      scope: 'consumer.app',
    }, {
      title: 'Events',
      path: '/account/event',
      scope: 'consumer.subscription',
    }, {
      title: 'Subscriptions',
      path: '/account/subscription',
      scope: 'consumer.payment',
    }];
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
