import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'fusio-account-container',
  templateUrl: './account-container.component.html',
  styleUrls: ['./account-container.component.css']
})
export class AccountContainerComponent implements OnInit {

  active: string = 'account';
  items: Array<Item> = this.getItems();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      this.items.forEach((item) => {
        if (this.router.url.startsWith(item.link)) {
          this.active = item.id;
        }
      });
    })

    this.items = this.getItems();
  }

  private getItems(): Array<Item> {
    return [{
      id: 'account',
      link: '/account',
      name: 'Account',
    }, {
      id: 'security',
      link: '/account/security',
      name: 'Security',
    }, {
      id: 'app',
      link: '/account/app',
      name: 'Apps',
    }, {
      id: 'event',
      link: '/account/event',
      name: 'Events',
    }, {
      id: 'subscription',
      link: '/account/subscription',
      name: 'Subscriptions',
    }];
  }

}

export interface Item {
  id: string
  link: string
  name: string
}
