import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';
import {NgxCaptchaModule} from "ngx-captcha";
import {GravatarModule} from "ngx-gravatar";
import {ClipboardModule} from 'ngx-clipboard';
import {MarkdownModule} from "ngx-markdown";
import {Config, FUSIO_CONFIG} from "./config/config";
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
import {AboutComponent} from "./component/about/about.component";
import {AccountComponent} from './component/account/account.component';
import {SecurityComponent} from './component/security/security.component';
import {SpecificationComponent} from "./component/specification/specification.component";
import {AppDetailComponent} from './component/app/detail/app-detail.component';
import {AppListComponent} from './component/app/list/app-list.component';
import {AppModalComponent} from './component/app/modal/app-modal.component';
import {AccountContainerComponent} from "./component/account-container/account-container.component";
import {SubscriptionComponent} from './component/subscription/subscription.component';
import {CallbackComponent} from './component/subscription/callback/callback.component';
import {NavigationComponent} from "./component/navigation/navigation.component";
import {BootstrapComponent} from "./component/bootstrap/bootstrap.component";
import {TokenDetailComponent} from "./component/token/detail/token-detail.component";
import {TokenListComponent} from "./component/token/list/token-list.component";
import {TokenModalComponent} from "./component/token/modal/token-modal.component";
import {TokenShowComponent} from "./component/token/show/token-show.component";
import {WebhookDetailComponent} from "./component/webhook/detail/webhook-detail.component";
import {WebhookListComponent} from "./component/webhook/list/webhook-list.component";
import {WebhookModalComponent} from "./component/webhook/modal/webhook-modal.component";

@NgModule({
  declarations: [
    AboutComponent,
    SpecificationComponent,
    AccountComponent,
    AccountContainerComponent,
    BootstrapComponent,
    EmptyComponent,
    HelpComponent,
    LoginComponent,
    ProviderComponent,
    LogoutComponent,
    MessageComponent,
    NavigationComponent,
    ConfirmComponent,
    ResetComponent,
    RegisterComponent,
    ActivateComponent,
    ScopesComponent,
    SearchComponent,
    SecurityComponent,
    SidebarComponent,
    SubscriptionComponent,
    CallbackComponent,
    AppDetailComponent,
    AppListComponent,
    AppModalComponent,
    TokenDetailComponent,
    TokenListComponent,
    TokenModalComponent,
    TokenShowComponent,
    WebhookDetailComponent,
    WebhookListComponent,
    WebhookModalComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    NgxCaptchaModule,
    GravatarModule,
    ClipboardModule,
    MarkdownModule.forRoot(),
  ],
  exports: [
    AccountComponent,
    AccountContainerComponent,
    BootstrapComponent,
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
    SecurityComponent,
    SidebarComponent,
    SubscriptionComponent,
    CallbackComponent,
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
    return ({
      ngModule: FusioSdkModule,
      providers: [{
        provide: FUSIO_CONFIG,
        useValue: config
      }]
    });
  }

}
