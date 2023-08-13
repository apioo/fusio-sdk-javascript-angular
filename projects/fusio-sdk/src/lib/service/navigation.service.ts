import { Injectable } from '@angular/core';
import {ConfigService} from "./config.service";
import {BackendService} from "./backend.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private backend: BackendService, private config: ConfigService) {
  }

  getMainNavigation(): Array<GroupItem> {
    return this.checkPermissions(this.config.getNavigation());
  }

  getUserNavigation(): Array<Item> {
    return this.checkPermissionItems(this.config.getUserNavigation());
  }

  getAnonymousNavigation(): Array<Item> {
    return this.checkPermissionItems(this.config.getAnonymousNavigation());
  }

  getAccountNavigation(): Array<Item> {
    return this.checkPermissionItems(this.config.getAccountNavigation());
  }

  private checkPermissions(navigation: Array<GroupItem>): Array<GroupItem> {
    let result = [];
    for (let i = 0; i < navigation.length; i++) {
      const children = this.checkPermissionItems(navigation[i].children);
      if (children.length > 0) {
        let menu = navigation[i];
        menu.children = children;
        result.push(menu);
      }
    }

    return result;
  }

  private checkPermissionItems(items: Items): Array<Item> {
    if (items instanceof Function) {
      items = items.apply(this);
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

export type ItemResolver = () => Array<Item>;

export type Items = Array<Item>|ItemResolver;

export interface Item {
  title: string
  icon?: string
  path: string
  scope?: string
}
