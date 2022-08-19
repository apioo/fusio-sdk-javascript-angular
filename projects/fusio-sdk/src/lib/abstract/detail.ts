import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

  async ngOnInit() {
  }

  doUpdateClick() {
    this.updateClick.emit();
  }

  doDeleteClick() {
    this.deleteClick.emit();
  }

}
