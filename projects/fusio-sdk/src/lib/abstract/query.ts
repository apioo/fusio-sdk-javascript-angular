import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientAbstract} from "sdkgen-client";
import {CommonCollection} from "fusio-sdk/dist/CommonCollection";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";
import {ApiService} from "../service/api.service";
import {ErrorService} from "../service/error.service";
import {EventService} from "../service/event.service";

/**
 * Base component to create a list panel to show and browse entities. If you extend this component you need to implement
 * the {@see openCreateDialog}, {@see openUpdateDialog} and {@see openDeleteDialog} method which are called in case the
 * user clicks on the new, edit or delete button. This class only uses native angular components so you can use it
 * independently of your UI framework
 */
@Component({
  template: '',
})
export abstract class Query<C extends ClientAbstract, T extends ModelId> implements OnInit {

  public search: string = '';
  public totalResults: number = 0;
  public entries: Array<T> = [];
  public selected?: T;
  public page: number = 1;
  public pageSize: number = 16;
  public response?: CommonMessage;
  public loading: boolean = true;

  protected fusio: ApiService<C>;
  protected route: ActivatedRoute;
  protected router: Router;
  protected event: EventService;
  protected error: ErrorService;

  constructor(fusio: ApiService<C>, route: ActivatedRoute, router: Router, event: EventService, error: ErrorService) {
    this.fusio = fusio;
    this.route = route;
    this.router = router;
    this.event = event;
    this.error = error;
  }

  async ngOnInit(): Promise<void> {
    this.startLoading();
    this.route.queryParams.subscribe(async params => {
      let page, search;
      if (params['page']) {
        page = parseInt(params['page']);
      }
      if (params['search']) {
        search = params['search'];
      }
      if (!this.hasQueryParamsChange(page, search)) {
        return;
      }
      this.startLoading();
      this.page = page || 1;
      this.search = search || '';
      await this.doList();
    });

    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id) {
        this.startLoading();
        await this.doGet(id);
      }
    });
  }

  async doList() {
    try {
      const response = await this.getAll(this.getCollectionQuery());

      this.totalResults = response.totalResults || 0;
      this.entries = response.entry || [];

      this.onList();
    } catch (error) {
      this.response = this.error.convert(error);
    }

    // in case we are not at a specific route redirect to the first
    const isDetailRoute: boolean|undefined = this.route.routeConfig?.path?.endsWith(':id');
    if (this.entries.length > 0 && this.entries[0].id && isDetailRoute === false && !this.selected) {
      await this.doGet('' + this.entries[0].id);
    }

    this.finishLoading();
  }

  protected getCollectionQuery(): Array<any> {
    let query: Array<any> = [];
    query.push((this.page - 1) * this.pageSize);
    query.push(this.pageSize);
    if (this.search) {
      query.push(this.search);
    }
    return query;
  }

  async doGet(id: string) {
    try {
      this.selected = await this.get(id);
      this.onGet();
    } catch (error) {
      this.response = this.error.convert(error);
    }

    this.finishLoading();
  }

  async doSearch(page?: number, search?: string) {
    if (!this.hasQueryParamsChange(page, search) || this.loading) {
      return;
    }
    if (this.selected) {
      await this.router.navigate([this.getRoute(), this.selected.id], {
        queryParams: this.getQueryParams(page, search)
      });
    } else {
      await this.router.navigate([this.getRoute()], {
        queryParams: this.getQueryParams(page, search)
      });
    }
    return false;
  }

  async doSelect(entry: T) {
    await this.router.navigate([this.getRoute(), entry.id], {
      queryParams: this.getQueryParams(this.page, this.search)
    });
  }

  abstract openCreateDialog(): void;

  abstract openUpdateDialog(entity: T): void;

  abstract openDeleteDialog(entity: T): void;

  getQueryParams(page?: number, search?: string): QueryParams {
    const queryParams: QueryParams = {};
    if (page) {
      queryParams.page = page;
    }
    if (search) {
      queryParams.search = search;
    }
    return queryParams;
  }

  hasQueryParamsChange(page?: number, search?: string): boolean {
    return this.page !== page || this.search !== search;
  }

  private startLoading(): void {
    this.loading = true;
  }

  private finishLoading(): void {
    setTimeout(() => {
      this.loading = false;
    }, 100);
  }

  protected abstract getAll(parameters: Array<any>): Promise<CommonCollection<T>>;
  protected abstract get(id: string): Promise<T>;
  protected abstract getRoute(): string;

  protected onList(): void
  {
    this.event.dispatchModelList(this.getRoute());
  }

  protected onGet(): void
  {
    this.event.dispatchModelDetail(this.selected, this.getRoute());
  }

}

export interface QueryParams {
  page?: number
  search?: string
}

export interface ModelId {
  id?: number|string
}
