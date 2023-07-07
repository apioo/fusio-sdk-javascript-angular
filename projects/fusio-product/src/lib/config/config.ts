import {InjectionToken} from "@angular/core";

export interface Config {
  logo?: string,
  apiUrl?: string,
  home?: HomeConfig
  pricing?: PricingConfig
  faq?: FaqConfig
  backend?: BackendConfig
  imprintUrl?: string,
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

export const FUSIO_CONFIG = new InjectionToken<Config>('FUSIO_PRODUCT_CONFIG');
