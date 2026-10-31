import {Routes} from '@angular/router';
import {AccountComponent} from "./account/account.component";
import {isAuthenticated} from "../../projects/fusio-sdk/src/lib/guard/authentication.guard";
import {AccountRoute} from "../../projects/fusio-sdk/src/lib/route/account-route";
import {AuthorizationRoute} from "../../projects/fusio-sdk/src/lib/route/authorization-route";
import {Dashboard} from "./dashboard/dashboard";
import {EntityRoute} from "../../projects/fusio-sdk/src/lib/route/entity-route";
import {ListComponent} from "./action/list/list.component";
import {DetailComponent} from "./action/detail/detail.component";
import {FormComponent} from "./action/form/form.component";

export const routes: Routes = [
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  { path: 'account', component: AccountComponent, canActivate: [isAuthenticated], children: AccountRoute.getAll()},
  { path: 'dashboard', component: Dashboard, canActivate: [isAuthenticated] },
  { path: 'action', canActivate: [isAuthenticated], children: EntityRoute.getAll(ListComponent, DetailComponent, FormComponent) },
  ...AuthorizationRoute.getAll()
];
