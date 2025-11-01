import {Component, EnvironmentInjector, OnInit, signal} from '@angular/core';
import {BackendUser} from "fusio-sdk";
import {UserService} from "../../service/user.service";
import {Item, NavigationService} from "../../service/navigation.service";
import {NavigationComponent} from "../navigation/navigation.component";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'fusio-bootstrap',
  templateUrl: './bootstrap.component.html',
  imports: [
    NavigationComponent,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownItem,
    RouterLink,
    NgbDropdownToggle,
    RouterOutlet
  ],
  styleUrls: ['./bootstrap.component.css']
})
export class BootstrapComponent implements OnInit {
  user?: BackendUser;
  userMenu = signal<Array<Item>>([]);
  anonymousMenu = signal<Array<Item>>([]);

  constructor(private userMeta: UserService, private navigation: NavigationService) { }

  async ngOnInit(): Promise<void> {
    this.user = this.userMeta.get();
    this.userMenu.set(await this.navigation.getUserNavigation());
    this.anonymousMenu.set(await this.navigation.getAnonymousNavigation());
  }

}
