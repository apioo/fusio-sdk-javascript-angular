import {Component, EventEmitter, input, Output} from '@angular/core';

@Component({
  selector: 'fusio-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent {

  loading = input<boolean>(true);

  @Output()
  newClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  doClick() {
    this.newClick.emit();
  }

}
