import {Component, EventEmitter, input, Output} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'fusio-list-buttons',
  imports: [
    RouterLink
  ],
  templateUrl: './list-buttons.component.html',
  styleUrl: './list-buttons.component.css',
})
export class ListButtonsComponent {

  buttons = input<Array<Button>>([]);

  @Output() onDetail = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

}

interface Button {
  icon: string
  link: Array<any>
  type?: 'primary'|'secondary'|'info'|'warning'|'danger'
  title?: string
}
