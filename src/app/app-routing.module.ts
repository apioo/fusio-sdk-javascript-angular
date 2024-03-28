import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {isAuthenticated} from "../../projects/fusio-sdk/src/lib/guard/authentication.guard";
import {AccountRoute} from "../../projects/fusio-sdk/src/lib/route/account-route";
import {AuthorizationRoute} from "../../projects/fusio-sdk/src/lib/route/authorization-route";
import {AccountComponent} from "./account/account.component";

const routes: Routes = [
  { path: '', component: AccountComponent, canActivate: [isAuthenticated] },
  { path: 'account', component: AccountComponent, canActivate: [isAuthenticated], children: AccountRoute.getAll()},

];

routes.push(...AuthorizationRoute.getAll());

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
