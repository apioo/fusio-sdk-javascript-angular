import {InjectionToken} from "@angular/core";
import {UserAccount} from "fusio-sdk/dist/src/generated/consumer/UserAccount";
import {Plan} from "fusio-sdk/dist/src/generated/consumer/Plan";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";

export interface Config {
  baseUrl: string,
  logo?: string,
  homePath?: string,
  paymentProvider?: string,
  paymentCurrency?: string,
  providers?: Array<Provider>,
  recaptcha?: string,
  apiUrl?: string,
  helpUrl?: string,
  imprintUrl?: string,
  home?: HomeConfig
  pricing?: PricingConfig
  faq?: FaqConfig
  backend?: BackendConfig
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

export interface Provider {
  name: string,
  icon: string,
  key: string
  url: string,
  params: Record<string, string>
}

export interface HomeConfig {
  headline: string,
  description: string,
  backgroundImage: string,
  features: Array<Feature>,
  youtube?: string,
}

export interface Feature {
  icon: string,
  title: string,
  description: string,
}

export interface PricingConfig {
  description: string,
  products: Array<Product>,
}

export interface Product {
  planId: number,
  title: string,
  price: number,
  features: Array<string>,
}

export interface FaqConfig {
  description: string,
  questions: Array<Question>
}

export interface Question {
  title: string,
  answer: string,
}

export interface BackendConfig {
  navigation: Array<Item>
}

export interface Item {
  icon: string
  id: string
  link: string
  name: string
}

export const FUSIO_CONFIG = new InjectionToken<Config>('FUSIO_CONFIG');
