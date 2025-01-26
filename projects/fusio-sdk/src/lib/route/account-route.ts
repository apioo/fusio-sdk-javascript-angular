import {Routes} from "@angular/router";
import {AccountComponent} from "../component/account/account.component";
import {SecurityComponent} from "../component/security/security.component";
import {AppListComponent} from '../component/app/list/app-list.component';
import {SubscriptionComponent} from "../component/subscription/subscription.component";
import {CallbackComponent} from "../component/subscription/callback/callback.component";
import {WebhookListComponent} from "../component/webhook/list/webhook-list.component";
import {TokenListComponent} from "../component/token/list/token-list.component";
import {SpecificationComponent} from "../component/specification/specification.component";
import {AboutComponent} from "../component/about/about.component";
import {isAuthenticated} from "../guard/authentication.guard";
import {LogListComponent} from "../component/log/list/log-list.component";
import {WebhookFormComponent} from "../component/webhook/form/webhook-form.component";
import {TokenFormComponent} from "../component/token/form/token-form.component";
import {TokenDetailComponent} from "../component/token/detail/token-detail.component";
import {WebhookDetailComponent} from "../component/webhook/detail/webhook-detail.component";
import {LogDetailComponent} from "../component/log/detail/log-detail.component";
import {AppDetailComponent} from "../component/app/detail/app-detail.component";
import {AppFormComponent} from "../component/app/form/app-form.component";
import {EntityRoute} from "./entity-route";

export class AccountRoute {

  public static getAll(): Routes {
    return [
      {path: '', component: AccountComponent, canActivate: [isAuthenticated]},
      {path: 'security', component: SecurityComponent, canActivate: [isAuthenticated]},
      {path: 'app', canActivate: [isAuthenticated], children: EntityRoute.getAll(AppListComponent, AppDetailComponent, AppFormComponent)},
      {path: 'subscription', component: SubscriptionComponent, canActivate: [isAuthenticated]},
      {path: 'subscription/callback/:plan_id', component: CallbackComponent, canActivate: [isAuthenticated]},
      {path: 'webhook', canActivate: [isAuthenticated], children: EntityRoute.getAll(WebhookListComponent, WebhookDetailComponent, WebhookFormComponent)},
      {path: 'token', canActivate: [isAuthenticated], children: EntityRoute.getAll(TokenListComponent, TokenDetailComponent, TokenFormComponent)},
      {path: 'log', canActivate: [isAuthenticated], children: EntityRoute.getAll(LogListComponent, LogDetailComponent)},
      {path: 'specification', component: SpecificationComponent, canActivate: [isAuthenticated]},
      {path: 'about', component: AboutComponent, canActivate: [isAuthenticated]},
    ];
  }

}
