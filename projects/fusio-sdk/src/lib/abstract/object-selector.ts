import {Component, EventEmitter, Input, Output} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, map, merge, Observable, of, OperatorFunction, Subject, switchMap, tap} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {ModelId} from "./query";
import {CommonCollection} from "fusio-sdk/dist/CommonCollection";

/**
 * Object selector
 */
@Component({
  template: '',
})
export abstract class ObjectSelector<T extends ModelId> {

  @Input() name!: string;
  @Input() disabled: boolean = false;
  @Input() data?: number = undefined;
  @Output() dataChange = new EventEmitter<number>();

  focus$ = new Subject<string>();

  searching = false;
  searchFailed = false;

  selected?: T

  objectFormatter = (object: T): string => {
    if (typeof object === 'object' && object.hasOwnProperty(this.getNameKey())) {
      return (object as any)[this.getNameKey()];
    }

    return '-';
  };

  objectSearch: OperatorFunction<string, Array<T>> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$).pipe(
      tap(() => (this.searching = true)),
      switchMap((term) =>
        fromPromise(this.getAll([0, 16, term])).pipe(
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
      this.selected = await this.get('' + this.data);
    }
  }

  changeValue() {
    if (this.disabled) {
      return;
    }

    const id = this.selected?.id;
    if (!id) {
      return;
    }

    this.dataChange.emit(parseInt('' + id));
  }

  protected getNameKey(): string
  {
    return 'name';
  }

  protected abstract getAll(parameters: Array<any>): Promise<CommonCollection<T>>;

  protected abstract get(id: string): Promise<T>;

}
