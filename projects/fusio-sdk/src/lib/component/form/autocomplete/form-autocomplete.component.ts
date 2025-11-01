import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IdAndName, Service} from "../../../abstract/service";
import {catchError, debounceTime, distinctUntilChanged, map, merge, Observable, of, OperatorFunction, Subject, switchMap, tap} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {FormsModule} from "@angular/forms";
import {NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'fusio-form-autocomplete',
  templateUrl: './form-autocomplete.component.html',
  imports: [
    FormsModule,
    NgbTypeahead
  ],
  styleUrls: ['./form-autocomplete.component.css']
})
export class FormAutocompleteComponent implements OnInit {

  @Input() name!: string;
  @Input() disabled: boolean = false;
  @Input() data?: string|number = undefined;
  @Input() service!: Service<any>;
  @Input() useTilde: boolean = false;
  @Input() useId: boolean = false;
  @Output() dataChange = new EventEmitter<string>();
  @Output() dataChangeId = new EventEmitter<number>();
  @Output() enter = new EventEmitter<void>();

  focus$ = new Subject<string>();

  searching = false;
  searchFailed = false;

  selected?: IdAndName<any>

  objectFormatter = (object: IdAndName<any>): string => {
    return object.name;
  };

  objectSearch: OperatorFunction<string, Array<IdAndName<any>>> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$).pipe(
      tap(() => (this.searching = true)),
      switchMap((term) =>
        fromPromise(this.service.getAllWithIdAndName([0, 16, term])).pipe(
          map((response) => {
            return response.entry ? response.entry : [];
          }),
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }),
        ),
      ),
      tap(() => (this.searching = false)),
    );
  }

  async ngOnInit(): Promise<void> {
    if (this.data) {
      this.selected = await this.service.getWithIdAndName((this.useTilde ? '~' : '') + this.data);
    }
  }

  changeValue() {
    if (this.disabled || !this.selected) {
      return;
    }

    if (this.dataChange.observed) {
      if (this.selected.name) {
        this.dataChange.emit(this.useId ? this.selected.id : this.selected.name);
      }
    } else if (this.dataChangeId.observed) {
      if (this.selected.id) {
        this.dataChangeId.emit(parseInt(this.selected.id));
      }
    }
  }

}
