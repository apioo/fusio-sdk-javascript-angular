import {Component, OnInit} from '@angular/core';
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {UserService} from "../../service/user.service";
import {Item, NavigationService} from "../../service/navigation.service";
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'fusio',
  templateUrl: './fusio.component.html',
  styleUrls: ['./fusio.component.css']
})
export class FusioComponent implements OnInit {
  user?: User;
  menu: Array<Item> = [];

  constructor(private userMeta: UserService, private navigation: NavigationService) { }

  ngOnInit(): void {
    this.user = this.userMeta.get();
    this.menu = this.navigation.getUserNavigation();
  }

}
