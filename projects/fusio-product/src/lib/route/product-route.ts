import {Routes} from "@angular/router";
import {HomeComponent} from "../component/home/home.component";
import {FaqComponent} from "../component/faq/faq.component";
import {PricingComponent} from "../component/pricing/pricing.component";
import {ImprintComponent} from "../component/imprint/imprint.component";
import {
  ActivateComponent,
  ConfirmComponent,
  LoginComponent,
  LogoutComponent,
  ProviderComponent,
  RegisterComponent,
  ResetComponent
} from "ngx-fusio-sdk";

export class ProductRoute {

  public static getAll(): Routes {
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
    ];
  }

}
