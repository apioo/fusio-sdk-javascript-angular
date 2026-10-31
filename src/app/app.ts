import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {BackendUser} from "fusio-sdk";
import {NgClass} from "@angular/common";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../projects/fusio-sdk/src/lib/service/user.service";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  title = 'fusio';
  hasUrl = signal(true);
  hasActiveInstance = signal(false);

  user?: BackendUser;
  menu = [{
    title: 'Account',
    path: '/account'
  }, {
    title: 'Logout',
    path: '/logout'
  }];

  currentVersion = '';

  private userMeta = inject(UserService);

  ngOnInit(): void {
    this.user = this.userMeta.get();
    this.hasUrl.set(typeof FUSIO_URL !== 'undefined' && FUSIO_URL !== null && FUSIO_URL !== '');
    this.hasActiveInstance.set(false);

    this.currentVersion = 'dev';
  }

}

declare global {
  var FUSIO_URL: string | undefined;
}
