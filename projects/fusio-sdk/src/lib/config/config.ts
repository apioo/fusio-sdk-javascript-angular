import {InjectionToken} from "@angular/core";
import {GroupItem, Items} from "../service/navigation.service";

export interface Config {
  instance?: number,
  baseUrl: string,
  title?: string,
  version?: string,
  logo?: string,
  appId?: number,
  appKey?: string,
  homePath?: string,
  loginPath?: string,
  navigation?: Array<GroupItem>,
  userNavigation?: Items,
  anonymousNavigation?: Items,
  accountNavigation?: Items,
  paymentProvider?: string,
  paymentCurrency?: string,
  recaptcha?: string,
  helpUrl?: string,
}

export const FUSIO_CONFIG = new InjectionToken<Config>('FUSIO_SDK_CONFIG');
