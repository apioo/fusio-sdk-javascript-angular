import {Component, OnInit} from '@angular/core';
import {ConsumerService} from "../../service/consumer.service";
import {UserAccount} from "fusio-sdk/dist/src/generated/consumer/UserAccount";
import {UserService} from "../../service/user.service";
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'fusio-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isAuthenticated = true;
  isMenuCollapsed = true;
  account?: UserAccount;
  apiUrl?: string;
  logo?: string;

  constructor(private consumer: ConsumerService, private user: UserService, private config: ConfigService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.consumer.hasValidToken();
    this.account = this.user.get();
    this.apiUrl = this.consumer.getBaseUrl();
    this.logo = this.config.getLogo();
  }

}
