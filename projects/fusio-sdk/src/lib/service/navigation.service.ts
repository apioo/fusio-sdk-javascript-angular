import {EnvironmentInjector, Injectable, runInInjectionContext} from '@angular/core';
import {ConfigService} from "./config.service";
import {FusioService} from "./fusio.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private backend: FusioService, private config: ConfigService) {
  }

  async getMainNavigation(injector: EnvironmentInjector): Promise<Array<GroupItem>> {
    return this.checkPermissions(this.config.getNavigation(), injector);
  }

  async getUserNavigation(injector: EnvironmentInjector): Promise<Array<Item>> {
    return this.checkPermissionItems(this.config.getUserNavigation(), injector);
  }

  async getAnonymousNavigation(injector: EnvironmentInjector): Promise<Array<Item>> {
    return this.checkPermissionItems(this.config.getAnonymousNavigation(), injector);
  }

  async getAccountNavigation(injector: EnvironmentInjector): Promise<Array<Item>> {
    return this.checkPermissionItems(this.config.getAccountNavigation(), injector);
  }

  private async checkPermissions(navigation: Array<GroupItem>, injector: EnvironmentInjector): Promise<Array<GroupItem>> {
    let result = [];
    for (let i = 0; i < navigation.length; i++) {
      const children = await this.checkPermissionItems(navigation[i].children, injector);
      if (children.length > 0) {
        let menu = navigation[i];
        menu.children = children;
        result.push(menu);
      }
    }

    return result;
  }

  private async checkPermissionItems(items: Items, injector: EnvironmentInjector): Promise<Array<Item>> {
    if (items instanceof Function) {
      items = await runInInjectionContext(injector, items);
    }

    if (!Array.isArray(items)) {
      return [];
    }

    let result = [];
    for (let i = 0; i < items.length; i++) {
      const scope = items[i].scope;
      if (scope && !this.backend.hasScope(scope)) {
        continue;
      }

      result.push(items[i])
    }

    return result;
  }

}

export interface GroupItem {
  title: string
  visible: boolean
  children: Items
}

export type ItemResolver = () => Promise<Array<Item>>;

export type Items = Array<Item>|ItemResolver;

export interface Item {
  title: string
  icon?: string
  path: string
  scope?: string
}
