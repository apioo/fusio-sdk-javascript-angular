import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';
import {EmptyComponent} from "./component/empty/empty.component";
import {MessageComponent} from "./component/message/message.component";
import {SearchComponent} from "./component/search/search.component";
import {SidebarComponent} from "./component/sidebar/sidebar.component";
import {HelpComponent} from "./component/help/help.component";
import {BrowserModule} from "@angular/platform-browser";
import {ScopesComponent} from "./component/scopes/scopes.component";
import {LoginComponent} from "./component/login/login.component";
import {ProviderComponent} from "./component/login/provider/provider.component";
import {LogoutComponent} from "./component/logout/logout.component";
import {ConfirmComponent} from "./component/password/confirm/confirm.component";
import {ResetComponent} from "./component/password/reset/reset.component";
import {RegisterComponent} from "./component/register/register.component";
import {ActivateComponent} from "./component/register/activate/activate.component";
import {AccountComponent} from './component/account/account.component';
import {SecurityComponent} from './component/security/security.component';
import {Config, FUSIO_CONFIG} from "./config/config";
import {NgxCaptchaModule} from "ngx-captcha";
import {GravatarModule} from "ngx-gravatar";

@NgModule({
  declarations: [
    EmptyComponent,
    HelpComponent,
    LoginComponent,
    ProviderComponent,
    LogoutComponent,
    MessageComponent,
    ConfirmComponent,
    ResetComponent,
    RegisterComponent,
    ActivateComponent,
    ScopesComponent,
    SearchComponent,
    SidebarComponent,
    AccountComponent,
    SecurityComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    NgxCaptchaModule,
    GravatarModule,
  ],
  exports: [
    EmptyComponent,
    HelpComponent,
    MessageComponent,
    ScopesComponent,
    SearchComponent,
    SidebarComponent,
  ]
})
export class FusioSdkModule {

  constructor(@Optional() @SkipSelf() parentModule?: FusioSdkModule) {
    if (parentModule) {
      throw new Error(
        'FusioSdkModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config?: Config): ModuleWithProviders<FusioSdkModule> {
    return({
      ngModule: FusioSdkModule,
      providers: [{
        provide: FUSIO_CONFIG,
        useValue: config
      }]
    });
  }

}
