import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IdAndName, Service} from "../../../abstract/service";

@Component({
  selector: 'fusio-checkbox-list',
  templateUrl: './form-checkbox-list.component.html',
  styleUrls: ['./form-checkbox-list.component.css']
})
export class FormCheckboxListComponent implements OnInit {

  @Input() name!: string;
  @Input() disabled: boolean = false;
  @Input() data?: Array<string> = undefined;
  @Input() service!: Service<any>;
  @Input() useName: boolean = true;
  @Output() dataChange = new EventEmitter<Array<string>>();

  entries?: Array<IdAndName<any>>

  async ngOnInit(): Promise<void> {
    const response = await this.service.getAllWithIdAndName([0, 1024]);
    this.entries = response.entry;
  }

  scopeSelect(event: any, scope?: string) {
    const selected = event.target.checked;
    if (!scope) {
      return;
    }

    if (selected) {
      this.addScope(scope);
    } else {
      this.removeScope(scope);
    }
  }

  private addScope(scope: string) {
    this.data?.push(scope)
    this.dataChange.emit(this.data);
  }

  private removeScope(scope: string) {
    this.data = this.data?.filter((value) => {
      return value !== scope;
    });
    this.dataChange.emit(this.data);
  }

}
