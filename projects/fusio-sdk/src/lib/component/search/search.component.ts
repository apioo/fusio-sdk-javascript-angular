import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
export class SearchComponent implements OnInit {

  @Input()
  searchTerm?: string;

  @Input()
  helpPath?: string;

  @Input()
  placeholder!: string;

  @Input()
  buttons: Array<Button> = [];

  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  newClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(protected help: HelpService) {
  }

  ngOnInit(): void {
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
