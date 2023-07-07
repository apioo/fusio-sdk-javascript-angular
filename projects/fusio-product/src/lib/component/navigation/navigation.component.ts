import {Component, OnInit} from '@angular/core';
import {UserAccount} from "fusio-sdk/dist/src/generated/consumer/UserAccount";
import {ConsumerService, UserService} from "ngx-fusio-sdk";
import {ConfigService} from "../../service/config.service";
import {FaqConfig, PricingConfig} from "../../config/config";

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
  pricingConfig?: PricingConfig;
  faqConfig?: FaqConfig;
  logo?: string;

  constructor(private consumer: ConsumerService, private user: UserService, private config: ConfigService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.consumer.hasValidToken();
    this.account = this.user.get();
    this.apiUrl = this.config.getApiUrl();
    this.pricingConfig = this.config.getPricingConfig();
    this.faqConfig = this.config.getFaqConfig();
    this.logo = this.config.getLogo();
  }

}
