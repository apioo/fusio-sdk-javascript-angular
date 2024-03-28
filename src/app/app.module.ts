import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {FusioSdkModule} from "../../projects/fusio-sdk/src/lib/fusio-sdk.module";
import {ApiService as SDK} from "../../projects/fusio-sdk/src/lib/service/api.service";
import {ConfigBuilder} from "./config-builder";
import {ApiService} from "./api.service";
import {AccountComponent} from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FusioSdkModule.forRoot(ConfigBuilder.build())
  ],
  providers: [
    {
      provide: SDK,
      useExisting: ApiService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
