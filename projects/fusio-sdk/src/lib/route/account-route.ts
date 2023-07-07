import {Routes} from "@angular/router";
import {inject} from "@angular/core";
import {AccountComponent} from "../component/account/account.component";
import {SecurityComponent} from "../component/security/security.component";
import {ListComponent as AppListComponent} from '../component/app/list/list.component';
import {ListComponent as EventListComponent} from '../component/event/list/list.component';
import {SubscriptionComponent} from "../component/subscription/subscription.component";
import {CallbackComponent} from "../component/subscription/callback/callback.component";
import {isAuthenticated} from "../guard/authentication.guard";

export class AccountRoute {

  public static getAll(): Routes {
    return [
      {path: '', component: AccountComponent, canActivate: [isAuthenticated] },
      {path: 'security', component: SecurityComponent, canActivate: [isAuthenticated] },
      {path: 'app', component: AppListComponent, canActivate: [isAuthenticated] },
      {path: 'app/:id', component: AppListComponent, canActivate: [isAuthenticated] },
      {path: 'event', component: EventListComponent, canActivate: [isAuthenticated] },
      {path: 'event/:id', component: EventListComponent, canActivate: [isAuthenticated] },
      {path: 'subscription', component: SubscriptionComponent, canActivate: [isAuthenticated] },
      {path: 'subscription/callback/:plan_id', component: CallbackComponent, canActivate: [isAuthenticated] },
    ];
  }

}
