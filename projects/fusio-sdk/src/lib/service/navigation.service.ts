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
    return this.checkPermissionsItems(this.config.getUserNavigation());
  }

  getAnonymousNavigation(): Array<Item> {
    return this.config.getAnonymousNavigation();
  }

  getAccountNavigation(): Array<Item> {
    return this.checkPermissionsItems(this.config.getAccountNavigation());
  }

  private checkPermissions(navigation: Array<GroupItem>): Array<GroupItem> {
    let result = [];
    for (let i = 0; i < navigation.length; i++) {
      const children = this.checkPermissionsItems(navigation[i].children);
      if (children.length > 0) {
        let menu = navigation[i];
        menu.children = children;
        result.push(menu);
      }
    }

    return result;
  }

  private checkPermissionsItems(items: Array<Item>): Array<Item> {
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
  children: Array<Item>
}

export interface Item {
  title: string
  icon?: string
  path: string
  scope?: string
}
