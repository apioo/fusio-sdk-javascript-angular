import {Component, effect, EventEmitter, input, Input, Output, signal} from '@angular/core';
import {Service} from "../../../abstract/service";
import {FormAutocompleteComponent} from "../autocomplete/form-autocomplete.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'fusio-form-list',
  templateUrl: './form-list.component.html',
  imports: [
    FormAutocompleteComponent,
    FormsModule
  ],
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent {

  name = input.required<string>();
  disabled = input<boolean>(false);
  type = input<string>('text');
  data = input<Array<string>>([]);
  useTilde = input<boolean>(false);
  useId = input<boolean>(false);

  @Input() service?: Service<any>;
  @Output() dataChange = new EventEmitter<Array<string>>();

  local = signal<Array<any>>([]);
  newValue = signal<any>('');

  constructor() {
    effect(async () => {
      this.local.set(this.toLocal(this.data()));
    });
  }

  doChange(index: number, value?: any) {
    this.local.update((entries) => {
      entries[index].value = value;
      return entries;
    });

    this.dataChange.emit(this.fromLocal());
  }

  doAdd() {
    let newValue = this.newValue();
    if (!newValue) {
      return;
    }

    if (this.type() === 'number') {
      newValue = parseInt(newValue);
    }

    this.local.update((entries) => {
      entries.push({
        value: newValue
      });

      return entries;
    });

    this.newValue.set('');

    this.dataChange.emit(this.fromLocal());
  }

  doRemove(index: number) {
    this.local.update((entries) => {
      entries.splice(index, 1);

      return entries;
    });

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
    this.local().forEach((entry: Entry) => {
      data.push(entry.value);
    });
    return data;
  }

}

interface Entry {
  value: string
}
