import { Component, OnInit } from '@angular/core';
import {Item} from "../../config/config";
import {ConfigService} from "../../service/config.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'fusio-backend-container',
  templateUrl: './backend-container.component.html',
  styleUrls: ['./backend-container.component.css']
})
export class BackendContainerComponent implements OnInit {

  active?: string;
  items?: Array<Item>;

  constructor(private config: ConfigService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.items = this.config.getBackendConfig()?.navigation;
    if (this.items) {
      this.active = this.items[0].id;
    }

    this.route.url.subscribe(() => {
      this.items?.forEach((item) => {
        if (this.router.url.startsWith(item.link)) {
          this.active = item.id;
        }
      });
    })
  }

}
