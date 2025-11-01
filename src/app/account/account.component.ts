import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";
import {
  AccountContainerComponent
} from "../../../projects/fusio-sdk/src/lib/component/account-container/account-container.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  imports: [
    RouterOutlet,
    RouterLink,
    NgClass
  ],
  styleUrls: ['./account.component.css']
})
export class AccountComponent extends AccountContainerComponent{

}
