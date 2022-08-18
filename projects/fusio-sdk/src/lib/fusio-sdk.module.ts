import {NgModule} from '@angular/core';
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

@NgModule({
  declarations: [
    EmptyComponent,
    MessageComponent,
    SearchComponent,
    SidebarComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
  ],
  exports: [
    EmptyComponent,
    MessageComponent,
    SearchComponent,
    SidebarComponent,
    HelpComponent,
  ]
})
export class FusioSdkModule { }
