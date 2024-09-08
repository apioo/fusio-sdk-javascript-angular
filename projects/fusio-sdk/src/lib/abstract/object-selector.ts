import {Component, EventEmitter, Input, Output} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, map, merge, Observable, of, OperatorFunction, Subject, switchMap, tap} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {CommonCollection} from "fusio-sdk/dist/CommonCollection";

/**
 * Object selector
 */
@Component({
  template: '',
})
export abstract class ObjectSelector<T, R> {

  @Input() name!: string;
  @Input() disabled: boolean = false;
  @Input() data?: R = undefined;
  @Output() dataChange = new EventEmitter<R>();

  focus$ = new Subject<string>();

  searching = false;
  searchFailed = false;

  selected?: T

  objectFormatter = (object: T): string => {
    const name = this.getNameProperty(object);
    if (name) {
      return name;
    }

    const id = this.getIdProperty(object);
    if (id) {
      return '' + id;
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
    if (this.disabled || !this.selected) {
      return;
    }

    const id = this.getIdProperty(this.selected);
    if (!id) {
      return;
    }

    this.dataChange.emit(id);
  }

  protected getIdKey(): string
  {
    return 'id';
  }

  protected getNameKey(): string
  {
    return 'name';
  }

  protected abstract getAll(parameters: Array<any>): Promise<CommonCollection<T>>;

  protected abstract get(id: string): Promise<T>;

  private getIdProperty(object: T): R|undefined
  {
    if (typeof object === 'object' && object && object.hasOwnProperty(this.getIdKey())) {
      return (object as any)[this.getIdKey()];
    }

    return undefined;
  }

  private getNameProperty(object: T): string|undefined
  {
    if (typeof object === 'object' && object && object.hasOwnProperty(this.getNameKey())) {
      return (object as any)[this.getNameKey()];
    }

    return undefined;
  }

}
