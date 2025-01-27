import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Service} from "../../../abstract/service";

@Component({
  selector: 'fusio-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  @Input() name: string = 'list';
  @Input() type: string = 'text';
  @Input() data: Array<any> = [];
  @Input() service?: Service<any>;
  @Output() dataChange = new EventEmitter<Array<any>>();

  local: Array<any> = [];
  newValue: any = '';

  constructor() { }

  ngOnInit(): void {
    if (this.data) {
      this.local = this.toLocal(this.data);
    }
  }

  doChange(index: number, value?: any) {
    this.local[index].value = value;
    this.dataChange.emit(this.fromLocal());
  }

  doAdd() {
    if (!this.newValue) {
      return;
    }

    let newValue = this.newValue;
    if (this.type === 'number') {
      newValue = parseInt(newValue);
    }

    this.local.push({
      value: newValue
    });
    this.newValue = '';
    this.dataChange.emit(this.fromLocal());
  }

  doRemove(index: number) {
    this.local.splice(index, 1);
    this.dataChange.emit(this.fromLocal());
  }

  toLocal(data: Array<any>): Array<Entry> {
    let local: Array<Entry> = [];
    data.forEach((value) => {
      local.push({
        value: value
      });
    })
    return local;
  }

  fromLocal(): Array<any> {
    let data: Array<any> = [];
    this.local.forEach((entry: Entry) => {
      data.push(entry.value);
    });
    return data;
  }

}

interface Entry {
  value: string
}
