import {Component, EnvironmentInjector, OnInit} from '@angular/core';
import {GroupItem, NavigationService} from "../../service/navigation.service";
import {ConfigService} from "../../service/config.service";
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'fusio-navigation',
  templateUrl: './navigation.component.html',
  imports: [
    NgClass,
    RouterLink
  ],
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  title?: string;
  version?: string;
  items: Array<GroupItem> = [];

  protected readonly Array = Array;

  constructor(private navigation: NavigationService, private config: ConfigService, private injector: EnvironmentInjector) {
  }

  async ngOnInit(): Promise<void> {
    this.title = this.config.getTitle() || 'Fusio';
    this.version = this.config.getVersion();
    this.items = await this.navigation.getMainNavigation(this.injector);
  }

  changeNavHeading(item: GroupItem): void {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].visible = this.items[i].title === item.title
    }
  }

}
