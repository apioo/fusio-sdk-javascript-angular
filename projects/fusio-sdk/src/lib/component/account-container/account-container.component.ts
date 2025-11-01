import {Component, OnInit, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {Item, NavigationService} from "../../service/navigation.service";
import {AccountComponent as AccComponent} from "../account/account.component";
import {SecurityComponent} from "../security/security.component";
import {AppListComponent} from "../app/list/app-list.component";
import {SubscriptionComponent} from "../subscription/subscription.component";
import {WebhookListComponent} from "../webhook/list/webhook-list.component";
import {TokenListComponent} from "../token/list/token-list.component";
import {LogListComponent} from "../log/list/log-list.component";
import {SpecificationComponent} from "../specification/specification.component";
import {AboutComponent} from "../about/about.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'fusio-account-container',
  templateUrl: './account-container.component.html',
  imports: [
    RouterLink,
    RouterOutlet,
    NgClass
  ],
  styleUrls: ['./account-container.component.css']
})
export class AccountContainerComponent implements OnInit {

  active = signal<string>('');
  items = signal<Array<Item>>([]);

  constructor(private navigation: NavigationService) { }

  async ngOnInit(): Promise<void> {
    this.items.set(await this.navigation.getAccountNavigation())
  }

  onActivate(component: any) {
    if (component instanceof AccComponent) {
      this.active.set('Account');
    } else if (component instanceof SecurityComponent) {
      this.active.set('Security');
    } else if (component instanceof AppListComponent) {
      this.active.set('Apps');
    } else if (component instanceof SubscriptionComponent) {
      this.active.set('Subscription');
    } else if (component instanceof WebhookListComponent) {
      this.active.set('Webhook');
    } else if (component instanceof TokenListComponent) {
      this.active.set('Token');
    } else if (component instanceof LogListComponent) {
      this.active.set('Log');
    } else if (component instanceof SpecificationComponent) {
      this.active.set('Specification');
    } else if (component instanceof AboutComponent) {
      this.active.set('About');
    }
  }

}
