import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Item, NavigationService} from "../../service/navigation.service";

@Component({
  selector: 'fusio-account-container',
  templateUrl: './account-container.component.html',
  styleUrls: ['./account-container.component.css']
})
export class AccountContainerComponent implements OnInit {

  active?: string;
  items: Array<Item> = [];

  constructor(private router: Router, private route: ActivatedRoute, private navigation: NavigationService) { }

  async ngOnInit(): Promise<void> {
    this.items = await this.navigation.getAccountNavigation();
    this.active = this.items[0].title;

    this.route.url.subscribe(() => {
      this.items.forEach((item) => {
        if (this.router.url.startsWith(item.path)) {
          this.active = item.title;
        }
      });
    })
  }

}
