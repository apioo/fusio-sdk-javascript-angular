import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Service} from "../../../abstract/service";
import {FormAutocompleteComponent} from "../autocomplete/form-autocomplete.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'fusio-form-map',
  templateUrl: './form-map.component.html',
  imports: [
    FormAutocompleteComponent,
    FormsModule
  ],
  styleUrls: ['./form-map.component.css']
})
export class FormMapComponent implements OnInit {

  @Input() name!: string;
  @Input() disabled: boolean = false;
  @Input() type: string = 'text';
  @Input() data: Record<string, string> = {};
  @Input() service?: Service<any>;
  @Input() useTilde: boolean = false;
  @Input() useId: boolean = false;
  @Output() dataChange = new EventEmitter<Record<string, string>>();

  local: Array<Entry> = [];
  newKey: string = '';
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
    if (!this.newKey || !this.newValue) {
      return;
    }

    let newValue = this.newValue;
    if (this.type === 'number') {
      newValue = parseInt(newValue);
    }

    this.local.push({
      key: this.newKey,
      value: newValue,
    });

    this.newKey = '';
    this.newValue = '';
    this.dataChange.emit(this.fromLocal());

    const elKey = document.getElementById(this.name + '-newKey');
    if (elKey instanceof HTMLInputElement) {
      elKey.focus();
    }
  }

  doRemove(index: number) {
    this.local.splice(index, 1);
    this.dataChange.emit(this.fromLocal());
  }

  toLocal(data: Record<string, any>): Array<Entry> {
    let local = [];
    for (const [key, value] of Object.entries(data)) {
      local.push({
        key: key,
        value: value
      });
    }
    return local;
  }

  fromLocal(): Record<string, any> {
    let data: Record<string, any> = {};
    this.local.forEach((entry: Entry) => {
      data[entry.key] = entry.value;
    });
    return data;
  }

}

interface Entry {
  key: string
  value: string
}
