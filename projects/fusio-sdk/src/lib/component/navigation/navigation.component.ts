import {Component, EnvironmentInjector, OnInit, signal} from '@angular/core';
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

  title = signal<string|undefined>(undefined);
  version = signal<string|undefined>(undefined);
  items = signal<Array<GroupItem>>([]);

  protected readonly Array = Array;

  constructor(private navigation: NavigationService, private config: ConfigService) {
  }

  async ngOnInit(): Promise<void> {
    this.title.set(this.config.getTitle() || 'Fusio');
    this.version.set(this.config.getVersion());
    this.items.set(await this.navigation.getMainNavigation());
  }

  changeNavHeading(item: GroupItem): void {
    const items = this.items();
    for (let i = 0; i < items.length; i++) {
      this.items.update((entries) => {
        entries[i].visible = entries[i].title === item.title
        return entries;
      })
    }
  }

}
