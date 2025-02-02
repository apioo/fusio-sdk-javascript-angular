import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IdAndName, Service} from "../../../abstract/service";
import {catchError, debounceTime, distinctUntilChanged, map, merge, Observable, of, OperatorFunction, Subject, switchMap, tap} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Component({
  selector: 'fusio-form-autocomplete',
  templateUrl: './form-autocomplete.component.html',
  styleUrls: ['./form-autocomplete.component.css']
})
export class FormAutocompleteComponent implements OnInit {

  @Input() name!: string;
  @Input() disabled: boolean = false;
  @Input() data?: string = undefined;
  @Input() service!: Service<any>;
  @Input() useName: boolean = false;
  @Output() dataChange = new EventEmitter<string>();

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
      this.selected = await this.service.getWithIdAndName((this.useName ? '~' : '') + this.data);
    }
  }

  changeValue() {
    if (this.disabled || !this.selected) {
      return;
    }

    const value = this.useName ? this.selected.name : this.selected.id;
    if (!value) {
      return;
    }

    this.dataChange.emit(value);
  }

}
