import {Component, effect, EventEmitter, input, Input, Output, signal} from '@angular/core';
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
export class FormMapComponent {

  name = input.required<string>();
  disabled = input<boolean>(false);
  type = input<string>('text');
  data = input<Record<string, string>>({});
  useTilde = input<boolean>(false);
  useId = input<boolean>(false);

  @Input() service?: Service<any>;
  @Output() dataChange = new EventEmitter<Record<string, string>>();

  local = signal<Array<Entry>>([]);
  newKey = signal<string>('');
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
    })

    this.dataChange.emit(this.fromLocal());
  }

  doAdd() {
    let newKey = this.newKey();
    let newValue = this.newValue();

    if (!newKey || !newValue) {
      return;
    }

    if (this.type() === 'number') {
      newValue = parseInt(newValue);
    }

    this.local.update((entries) => {
      entries.push({
        key: newKey,
        value: newValue,
      });
      return entries;
    });

    this.newKey.set('');
    this.newValue.set('');
    this.dataChange.emit(this.fromLocal());

    const elKey = document.getElementById(this.name() + '-newKey');
    if (elKey instanceof HTMLInputElement) {
      elKey.focus();
    }
  }

  doRemove(index: number) {
    this.local.update((entries) => {
      entries.splice(index, 1);
      return entries;
    });

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
    this.local().forEach((entry: Entry) => {
      data[entry.key] = entry.value;
    });
    return data;
  }

}

interface Entry {
  key: string
  value: string
}
