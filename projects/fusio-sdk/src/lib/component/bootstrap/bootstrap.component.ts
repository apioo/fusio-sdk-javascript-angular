import {Component, OnInit} from '@angular/core';
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {UserService} from "../../service/user.service";
import {Item, NavigationService} from "../../service/navigation.service";

@Component({
  selector: 'fusio-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.css']
})
export class BootstrapComponent implements OnInit {
  user?: User;
  menu: Array<Item> = [];

  constructor(private userMeta: UserService, private navigation: NavigationService) { }

  ngOnInit(): void {
    this.user = this.userMeta.get();
    this.menu = this.navigation.getUserNavigation();
  }

}
