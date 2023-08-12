import {InjectionToken} from "@angular/core";
import {UserAccount} from "fusio-sdk/dist/src/generated/consumer/UserAccount";
import {Plan} from "fusio-sdk/dist/src/generated/consumer/Plan";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {GroupItem, Item} from "../service/navigation.service";

export interface Config {
  baseUrl: string,
  title?: string,
  version?: string,
  logo?: string,
  appId?: number,
  homePath?: string,
  loginPath?: string,
  navigation?: Array<GroupItem>,
  userNavigation?: Array<Item>,
  accountNavigation?: Array<Item>,
  paymentProvider?: string,
  paymentCurrency?: string,
  recaptcha?: string,
  helpUrl?: string,
  on?: EventListener
}

export interface EventListener {
  /**
   * Invoked on login
   */
  login?: (user: UserAccount) => void,

  /**
   * Invoked on logout
   */
  logout?: () => void,

  /**
   * Invoked if a user registers a new account
   */
  register?: (name: string, email: string) => void,

  /**
   * Invoked in case a user activates a registered account by verifying the account via email
   */
  register_activate?: () => void,

  /**
   * Invoked in case a user confirms a password reset
   */
  password_confirm?: () => void,

  /**
   * Invoked in case a user triggers the password reset process
   */
  password_reset?: () => void,

  /**
   * Invoked in case a user starts a checkout of a plan
   */
  checkout?: (plan: Plan) => void,

  /**
   * Invoked in case a user has purchased a plan
   */
  purchase?: (plan: Plan) => void,

  /**
   * Invoked in case an error occurred
   */
  error?: (error: Message) => void,

  /**
   * Invoked in case a model list was called
   */
  model_list?: (route: string) => void,

  /**
   * Invoked in case a model detail was called
   */
  model_detail?: (model: any, route: string) => void,

  /**
   * Invoked in case a model was created. The route contains the value from the getRoute() method at your list component
   * which you can then use to understand the model which gets passed
   */
  model_created?: (model: any, route: string) => void,

  /**
   * Invoked in case a model was updated. The route contains the value from the getRoute() method at your list component
   * which you can then use to understand the model which gets passed
   */
  model_updated?: (model: any, route: string) => void,

  /**
   * Invoked in case a model was deleted. The route contains the value from the getRoute() method at your list component
   * which you can then use to understand the model which gets passed
   */
  model_deleted?: (model: any, route: string) => void,
}

export const FUSIO_CONFIG = new InjectionToken<Config>('FUSIO_SDK_CONFIG');
