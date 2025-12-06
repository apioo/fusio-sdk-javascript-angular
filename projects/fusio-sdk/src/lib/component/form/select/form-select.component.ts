import {Component, EventEmitter, Input, input, Output, resource} from '@angular/core';
import {IdAndName, Service} from "../../../abstract/service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'fusio-form-select',
  templateUrl: './form-select.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./form-select.component.css']
})
export class FormSelectComponent {

  name = input.required<string>();
  data = input.required<string|undefined>();
  disabled = input<boolean>(false);
  useName= input<boolean>(true);

  @Input() service!: Service<any>;
  @Output() dataChange = new EventEmitter<string>();

  entries = resource({
    loader: async (): Promise<Array<IdAndName<any>>> => {
      const response = await this.service.getAllWithIdAndName([0, 1024]);
      return response.entry || [];
    },
  });

  changeValue(value: string) {
    if (!value) {
      return;
    }

    this.dataChange.emit(value);
  }

}
