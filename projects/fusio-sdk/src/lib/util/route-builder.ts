import {Routes} from "@angular/router";
import {AccountComponent} from "../component/account/account.component";
import {SecurityComponent} from "../component/security/security.component";
import {ListComponent as AppListComponent} from '../component/app/list/list.component';
import {ListComponent as EventListComponent} from '../component/event/list/list.component';
import {SubscriptionComponent} from "../component/subscription/subscription.component";
import {CallbackComponent} from "../component/subscription/callback/callback.component";

export class RouteBuilder {

  public static getAccountRoutes(): Routes {
    return [
      {path: '', component: AccountComponent},
      {path: 'security', component: SecurityComponent},
      {path: 'app', component: AppListComponent},
      {path: 'app/:id', component: AppListComponent},
      {path: 'event', component: EventListComponent},
      {path: 'event/:id', component: EventListComponent},
      {path: 'subscription', component: SubscriptionComponent},
      {path: 'subscription/callback/:plan_id', component: CallbackComponent},
    ];
  }

}
