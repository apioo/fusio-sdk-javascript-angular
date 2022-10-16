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
import {CallbackComponent} from "../component/subscription/callback/callback.component";
import {ListComponent as AppListComponent} from '../component/app/list/list.component';
import {ListComponent as EventListComponent} from '../component/event/list/list.component';
import {HomeComponent} from "../component/home/home.component";
import {FaqComponent} from "../component/faq/faq.component";
import {PricingComponent} from "../component/pricing/pricing.component";
import {BackendContainerComponent} from "../component/backend-container/backend-container.component";
import {ImprintComponent} from "../component/imprint/imprint.component";

export class RouteBuilder {

  public static getRoutes(children: Routes): Routes {
    return [
      {path: '', component: HomeComponent},
      {path: 'faq', component: FaqComponent},
      {path: 'pricing', component: PricingComponent},
      {path: 'imprint', component: ImprintComponent},
      {path: 'login', component: LoginComponent},
      {path: 'login/:provider', component: ProviderComponent},
      {path: 'logout', component: LogoutComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'register/activate/:token', component: ActivateComponent},
      {path: 'password/reset', component: ResetComponent},
      {path: 'password/confirm/:token', component: ConfirmComponent},
      {path: 'account', component: AccountContainerComponent, canActivate: [AuthenticationGuard], children: this.getAccountRoutes()},
      {path: 'backend', component: BackendContainerComponent, canActivate: [AuthenticationGuard], children: children},
    ];
  }

  private static getAccountRoutes(): Routes {
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
