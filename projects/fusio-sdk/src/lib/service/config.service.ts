import {Inject, Injectable} from '@angular/core';
import {
  Config,
  EventListener,
  FUSIO_CONFIG,
} from "../config/config";
import {GroupItem, Items} from "./navigation.service";

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

  public getAppKey(): string|undefined {
    return this.config.appKey;
  }

  public getHomePath(): string {
    if (this.config.homePath) {
      return this.config.homePath;
    } else {
      return '/';
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

  public getUserNavigation(): Items {
    return this.config.userNavigation || [{
      title: 'Account',
      path: '/account'
    }, {
      title: 'Logout',
      path: '/logout',
    }];
  }

  public getAnonymousNavigation(): Items {
    return this.config.anonymousNavigation || [{
      title: 'Login',
      path: '/login'
    }, {
      title: 'Register',
      path: '/register',
    }];
  }

  public getAccountNavigation(): Items {
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
      title: 'Subscription',
      path: '/account/subscription',
      scope: 'consumer.payment',
    }, {
      title: 'Webhook',
      path: '/account/webhook',
      scope: 'consumer.webhook',
    }, {
      title: 'Token',
      path: '/account/token',
      scope: 'consumer.token',
    }, {
      title: 'Log',
      path: '/account/log',
    }, {
      title: 'Specification',
      path: '/account/specification',
    }, {
      title: 'About',
      path: '/account/about',
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

  /**
   * @see https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
   */
  public getInstanceCode(): number {
    let hash = 0;
    if (this.config.baseUrl.length === 0) {
      return hash;
    }

    for (let i = 0; i < this.config.baseUrl.length; i++) {
      hash = ((hash << 5) - hash) + this.config.baseUrl.charCodeAt(i);
      hash |= 0;
    }

    return hash;
  }
}
