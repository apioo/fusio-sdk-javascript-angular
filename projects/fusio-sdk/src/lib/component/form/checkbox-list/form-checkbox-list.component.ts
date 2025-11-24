import {Component, effect, EventEmitter, input, Input, OnInit, Output, signal} from '@angular/core';
import {IdAndName, Service} from "../../../abstract/service";

@Component({
  selector: 'fusio-form-checkbox-list',
  templateUrl: './form-checkbox-list.component.html',
  styleUrls: ['./form-checkbox-list.component.css']
})
export class FormCheckboxListComponent implements OnInit {

  name = input.required<string>();
  disabled = input<boolean>(false);
  data = input<Array<string>|undefined>(undefined);
  useName = input<boolean>(true);

  @Input() service!: Service<any>;
  @Output() dataChange = new EventEmitter<Array<string>>();

  local = signal<Array<string>>([]);
  entries = signal<Array<IdAndName<any>>>([]);

  constructor() {
    effect(async () => {
      this.local.set(this.data() || []);
    });
  }

  async ngOnInit(): Promise<void> {
    const response = await this.service.getAllWithIdAndName([0, 1024]);
    this.entries.set(response.entry || []);
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
    this.local.update((entries) => {
      entries.push(scope);
      return entries;
    });

    this.dataChange.emit(this.local());
  }

  private removeScope(scope: string) {
    this.local.update((entries) => {
      return entries.filter((value) => {
        return value !== scope;
      });
    })

    this.dataChange.emit(this.local());
  }

}
