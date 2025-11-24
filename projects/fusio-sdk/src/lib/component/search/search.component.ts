import {Component, EventEmitter, Input, input, Output} from '@angular/core';
import {HelpService} from "../../service/help.service";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'fusio-search',
  templateUrl: './search.component.html',
  imports: [
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Input() searchTerm?: string;
  @Input() helpPath?: string;

  placeholder = input<string>('');
  buttons = input<Array<Button>>([]);

  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() newClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(protected help: HelpService) {
  }

  doSearch(search?: string): void {
    this.search.emit(search || '');
  }

  doCreateClick(): void {
    this.newClick.emit();
  }

  showHelp(path?: string) {
    if (!path) {
      return;
    }

    this.help.showDialog(path);
  }

}

interface Button {
  routerLink: string,
  icon: string,
}
