import {Component, OnInit} from '@angular/core';
import {GroupItem, NavigationService} from "../../service/navigation.service";
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'fusio-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  title?: string;
  version?: string;
  items: Array<GroupItem> = [];

  constructor(private navigation: NavigationService, private config: ConfigService) {
  }

  async ngOnInit(): Promise<void> {
    this.title = this.config.getTitle() || 'Fusio';
    this.version = this.config.getVersion();
    this.items = await this.navigation.getMainNavigation(this);
  }

  changeNavHeading(item: GroupItem): void {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].visible = this.items[i].title === item.title
    }
  }

}
