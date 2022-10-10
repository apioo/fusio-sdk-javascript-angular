import {Routes} from "@angular/router";
import {AuthenticationGuard} from "../guard/authentication.guard";
import {AccountContainerComponent} from "../component/account-container/account-container.component";
import {AccountComponent} from "../component/account/account.component";
import {SecurityComponent} from "../component/security/security.component";
import {SubscriptionComponent} from "../component/subscription/subscription.component";
import {LoginComponent} from "../component/login/login.component";
import {ProviderComponent} from "../component/login/provider/provider.component";
import {LogoutComponent} from "../component/logout/logout.component";
import {RegisterComponent} from "../component/register/register.component";
import {ActivateComponent} from "../component/register/activate/activate.component";
import {ResetComponent} from "../component/password/reset/reset.component";
import {ConfirmComponent} from "../component/password/confirm/confirm.component";
import {ListComponent as AppListComponent} from '../component/app/list/list.component';
import {ListComponent as EventListComponent} from '../component/event/list/list.component';

export class RouteBuilder {

  public static getRoutes(): Routes {
    return [
      {path: 'account', component: AccountContainerComponent, canActivate: [AuthenticationGuard], children: [
        {path: '', component: AccountComponent, canActivate: [AuthenticationGuard]},
        {path: 'security', component: SecurityComponent, canActivate: [AuthenticationGuard]},
        {path: 'app', component: AppListComponent, canActivate: [AuthenticationGuard]},
        {path: 'app/:id', component: AppListComponent, canActivate: [AuthenticationGuard]},
        {path: 'event', component: EventListComponent, canActivate: [AuthenticationGuard]},
        {path: 'event/:id', component: EventListComponent, canActivate: [AuthenticationGuard]},
        {path: 'subscription', component: SubscriptionComponent, canActivate: [AuthenticationGuard]},
      ]},
      {path: 'login', component: LoginComponent},
      {path: 'login/:provider', component: ProviderComponent},
      {path: 'logout', component: LogoutComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'register/activate/:token', component: ActivateComponent},
      {path: 'password/reset', component: ResetComponent},
      {path: 'password/confirm/:token', component: ConfirmComponent}
    ];
  }

}
