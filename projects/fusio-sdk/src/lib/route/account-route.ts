import {Routes} from "@angular/router";
import {AccountComponent} from "../component/account/account.component";
import {SecurityComponent} from "../component/security/security.component";
import {AppListComponent} from '../component/app/list/app-list.component';
import {SubscriptionComponent} from "../component/subscription/subscription.component";
import {CallbackComponent} from "../component/subscription/callback/callback.component";
import {WebhookListComponent} from "../component/webhook/list/webhook-list.component";
import {TokenListComponent} from "../component/token/list/token-list.component";
import {AboutComponent} from "../component/about/about.component";
import {isAuthenticated} from "../guard/authentication.guard";

export class AccountRoute {

  public static getAll(): Routes {
    return [
      {path: '', component: AccountComponent, canActivate: [isAuthenticated] },
      {path: 'security', component: SecurityComponent, canActivate: [isAuthenticated] },
      {path: 'app', component: AppListComponent, canActivate: [isAuthenticated] },
      {path: 'app/:id', component: AppListComponent, canActivate: [isAuthenticated] },
      {path: 'subscription', component: SubscriptionComponent, canActivate: [isAuthenticated] },
      {path: 'subscription/callback/:plan_id', component: CallbackComponent, canActivate: [isAuthenticated] },
      {path: 'webhook', component: WebhookListComponent, canActivate: [isAuthenticated] },
      {path: 'webhook/:id', component: WebhookListComponent, canActivate: [isAuthenticated] },
      {path: 'token', component: TokenListComponent, canActivate: [isAuthenticated] },
      {path: 'token/:id', component: TokenListComponent, canActivate: [isAuthenticated] },
      {path: 'about', component: AboutComponent, canActivate: [isAuthenticated] },
    ];
  }

}
