import {Routes} from '@angular/router';
import {AccountComponent} from "./account/account.component";
import {isAuthenticated} from "../../projects/fusio-sdk/src/lib/guard/authentication.guard";
import {AccountRoute} from "../../projects/fusio-sdk/src/lib/route/account-route";
import {AuthorizationRoute} from "../../projects/fusio-sdk/src/lib/route/authorization-route";

export const routes: Routes = [
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  { path: 'account', component: AccountComponent, canActivate: [isAuthenticated], children: AccountRoute.getAll()},
  ...AuthorizationRoute.getAll()
];
