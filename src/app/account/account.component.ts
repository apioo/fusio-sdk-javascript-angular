import { Component } from '@angular/core';
import {
  AccountContainerComponent
} from "../../../projects/fusio-sdk/src/lib/component/account-container/account-container.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent extends AccountContainerComponent {

}
