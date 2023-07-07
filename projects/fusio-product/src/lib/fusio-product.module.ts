import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {BackendContainerComponent} from './component/backend-container/backend-container.component';
import {FaqComponent} from './component/faq/faq.component';
import {FooterComponent} from './component/footer/footer.component';
import {HomeComponent} from './component/home/home.component';
import {ImprintComponent} from './component/imprint/imprint.component';
import {NavigationComponent} from './component/navigation/navigation.component';
import {PricingComponent} from './component/pricing/pricing.component';
import {Config, FUSIO_CONFIG} from "./config/config";
import {NgbCollapse, NgbModule, NgbNav, NgbNavItem, NgbNavLink} from "@ng-bootstrap/ng-bootstrap";
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {CommonModule, CurrencyPipe, NgStyle} from "@angular/common";
import {FusioSdkModule} from "ngx-fusio-sdk";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    BackendContainerComponent,
    FaqComponent,
    FooterComponent,
    HomeComponent,
    ImprintComponent,
    NavigationComponent,
    PricingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    FusioSdkModule,
  ],
  exports: [
    BackendContainerComponent,
    FaqComponent,
    FooterComponent,
    HomeComponent,
    ImprintComponent,
    NavigationComponent,
    PricingComponent,
  ]
})
export class FusioProductModule {

  constructor(@Optional() @SkipSelf() parentModule?: FusioProductModule) {
    if (parentModule) {
      throw new Error('FusioProductModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config?: Config): ModuleWithProviders<FusioProductModule> {
    return ({
      ngModule: FusioProductModule,
      providers: [{
        provide: FUSIO_CONFIG,
        useValue: config
      }]
    });
  }

}
