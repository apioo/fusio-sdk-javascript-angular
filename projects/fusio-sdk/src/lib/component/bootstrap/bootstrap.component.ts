import {Component, EnvironmentInjector, OnInit} from '@angular/core';
import {BackendUser} from "fusio-sdk/dist/src/BackendUser";
import {UserService} from "../../service/user.service";
import {Item, NavigationService} from "../../service/navigation.service";

@Component({
  selector: 'fusio-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.css']
})
export class BootstrapComponent implements OnInit {
  user?: BackendUser;
  userMenu: Array<Item> = [];
  anonymousMenu: Array<Item> = [];

  constructor(private userMeta: UserService, private navigation: NavigationService, private injector: EnvironmentInjector) { }

  async ngOnInit(): Promise<void> {
    this.user = this.userMeta.get();
    this.userMenu = await this.navigation.getUserNavigation(this.injector);
    this.anonymousMenu = await this.navigation.getAnonymousNavigation(this.injector);
  }

}
