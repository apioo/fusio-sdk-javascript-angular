import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IdAndName, Service} from "../../../abstract/service";

@Component({
  selector: 'fusio-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css']
})
export class FormSelectComponent implements OnInit {

  @Input() name!: string;
  @Input() disabled: boolean = false;
  @Input() data?: string = undefined;
  @Input() service!: Service<any>;
  @Input() useName: boolean = true;
  @Output() dataChange = new EventEmitter<string>();

  entries?: Array<IdAndName<any>>

  async ngOnInit(): Promise<void> {
    const response = await this.service.getAllWithIdAndName([0, 1024]);
    this.entries = response.entry;
  }

  changeValue(value: string) {
    if (!value) {
      return;
    }

    this.dataChange.emit(value);
  }

}
