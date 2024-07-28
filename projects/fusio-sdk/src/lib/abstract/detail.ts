import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

/**
 * This component is only a basic view component which renders a provided entity. It should only render the provided
 * JSON data it should not contain any additional logic to request data from an endpoint
 */
@Component({
  template: '',
})
export abstract class Detail<T> implements OnInit {

  @Input()
  selected!: T;
  @Output()
  updateClick: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  deleteClick: EventEmitter<void> = new EventEmitter<void>();

  jsonView: boolean = false;

  async ngOnInit() {
  }

  doUpdateClick() {
    this.updateClick.emit();
  }

  doDeleteClick() {
    this.deleteClick.emit();
  }

}
