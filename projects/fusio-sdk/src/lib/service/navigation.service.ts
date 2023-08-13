import {Injectable, OnInit} from '@angular/core';
import {ConfigService} from "./config.service";
import {BackendService} from "./backend.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private backend: BackendService, private config: ConfigService) {
  }

  async getMainNavigation(context: OnInit): Promise<Array<GroupItem>> {
    return this.checkPermissions(this.config.getNavigation(), context);
  }

  async getUserNavigation(context: OnInit): Promise<Array<Item>> {
    return this.checkPermissionItems(this.config.getUserNavigation(), context);
  }

  async getAnonymousNavigation(context: OnInit): Promise<Array<Item>> {
    return this.checkPermissionItems(this.config.getAnonymousNavigation(), context);
  }

  async getAccountNavigation(context: OnInit): Promise<Array<Item>> {
    return this.checkPermissionItems(this.config.getAccountNavigation(), context);
  }

  private async checkPermissions(navigation: Array<GroupItem>, context: OnInit): Promise<Array<GroupItem>> {
    let result = [];
    for (let i = 0; i < navigation.length; i++) {
      const children = await this.checkPermissionItems(navigation[i].children, context);
      if (children.length > 0) {
        let menu = navigation[i];
        menu.children = children;
        result.push(menu);
      }
    }

    return result;
  }

  private async checkPermissionItems(items: Items, context: OnInit): Promise<Array<Item>> {
    if (items instanceof Function) {
      items = await items.apply(context);
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
