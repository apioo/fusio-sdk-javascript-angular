import {Component, EventEmitter, input, Output} from '@angular/core';
import {FormButtonComponent} from "../button/form-button.component";

@Component({
  selector: 'fusio-form-buttons',
  imports: [
    FormButtonComponent
  ],
  templateUrl: './form-buttons.component.html',
  styleUrl: './form-buttons.component.css',
})
export class FormButtonsComponent {

  mode = input.required<number>();
  loading = input.required<boolean>();

  @Output() onCreate = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();
  @Output() onBack = new EventEmitter<void>();
  @Output() onHelp = new EventEmitter<void>();

}
