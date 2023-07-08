import {Routes} from "@angular/router";
import {LoginComponent} from "../component/login/login.component";
import {ProviderComponent} from "../component/login/provider/provider.component";
import {LogoutComponent} from "../component/logout/logout.component";
import {RegisterComponent} from "../component/register/register.component";
import {ActivateComponent} from "../component/register/activate/activate.component";
import {ResetComponent} from "../component/password/reset/reset.component";
import {ConfirmComponent} from "../component/password/confirm/confirm.component";

export class AuthorizationRoute {

  public static getAll(): Routes {
    return [
      {path: 'login', component: LoginComponent},
      {path: 'login/:provider', component: ProviderComponent},
      {path: 'logout', component: LogoutComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'register/activate/:token', component: ActivateComponent},
      {path: 'password/reset', component: ResetComponent},
      {path: 'password/confirm/:token', component: ConfirmComponent},
    ];
  }

}
