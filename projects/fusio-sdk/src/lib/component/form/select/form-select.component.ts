import {Component, EventEmitter, Input, input, OnInit, Output, signal} from '@angular/core';
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
export class FormSelectComponent implements OnInit {

  name = input.required<string>();
  data = input.required<string|undefined>();
  disabled = input<boolean>(false);
  useName= input<boolean>(true);

  @Input() service!: Service<any>;
  @Output() dataChange = new EventEmitter<string>();

  entries = signal<Array<IdAndName<any>>>([]);

  async ngOnInit(): Promise<void> {
    const response = await this.service.getAllWithIdAndName([0, 1024]);
    this.entries.set(response.entry || []);
  }

  changeValue(value: string) {
    if (!value) {
      return;
    }

    this.dataChange.emit(value);
  }

}
