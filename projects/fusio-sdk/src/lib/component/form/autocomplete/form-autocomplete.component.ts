import {Component, effect, EventEmitter, input, Input, Output, signal} from '@angular/core';
import {IdAndName, Service} from "../../../abstract/service";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  Observable,
  of,
  OperatorFunction,
  Subject,
  switchMap,
  tap
} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {FormsModule} from "@angular/forms";
import {NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {NgClass} from "@angular/common";

@Component({
  selector: 'fusio-form-autocomplete',
  templateUrl: './form-autocomplete.component.html',
  imports: [
    FormsModule,
    NgbTypeahead,
    NgClass
  ],
  styleUrls: ['./form-autocomplete.component.css']
})
export class FormAutocompleteComponent {

  @Input() service!: Service<any>;
  @Output() dataChange = new EventEmitter<string>();
  @Output() dataChangeId = new EventEmitter<number>();
  @Output() enter = new EventEmitter<void>();

  focus$ = new Subject<string>();

  name = input.required<string>();
  disabled = input<boolean>(false);
  data = input<string|number|undefined>();
  useTilde = input<boolean>(false);
  useId = input<boolean>(false);

  searching = signal<boolean>(false);
  searchFailed = signal<boolean>(false);

  selected = signal<IdAndName<any>|undefined>(undefined)

  objectFormatter = (object: IdAndName<any>): string => {
    return object.name;
  };

  objectSearch: OperatorFunction<string, Array<IdAndName<any>>> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$).pipe(
      tap(() => (this.searching.set(true))),
      switchMap((term) =>
        fromPromise(this.service.getAllWithIdAndName([0, 16, term])).pipe(
          map((response) => {
            return response.entry ? response.entry : [];
          }),
          tap(() => (this.searchFailed.set(false))),
          catchError(() => {
            this.searchFailed.set(true);
            return of([]);
          }),
        ),
      ),
      tap(() => (this.searching.set(false))),
    );
  }

  constructor() {
    effect(async () => {
      const data = this.data();
      if (data) {
        this.selected.set(await this.service.getWithIdAndName((this.useTilde() ? '~' : '') + data));
      }
    });
  }

  changeValue() {
    const selected = this.selected();
    if (this.disabled() || !selected) {
      return;
    }

    if (this.dataChange.observed) {
      if (this.useId() && selected.id) {
        this.dataChange.emit(selected.id);
      } else if (selected.name) {
        this.dataChange.emit(selected.name);
      }
    } else if (this.dataChangeId.observed) {
      if (selected.id) {
        this.dataChangeId.emit(parseInt(selected.id));
      }
    }
  }

}
