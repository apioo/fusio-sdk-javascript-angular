import {Component, OnInit} from '@angular/core';
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import axios, {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {CollectionQuery} from "fusio-sdk/dist/src/generated/backend/CollectionQuery";
import {FusioService} from "../service/fusio.service";
import {ClientAbstract} from "sdkgen-client";
import {ErrorConverter} from "../util/error-converter";

@Component({
  template: '',
})
export abstract class List<C extends ClientAbstract, T extends ModelId> implements OnInit {

  public search: string = '';
  public totalResults: number = 0;
  public entries: Array<T> = [];
  public selected?: T;
  public page: number = 1;
  public pageSize: number = 16;
  public response?: Message;
  public loading: boolean = true;

  constructor(protected fusio: FusioService<C>, protected route: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {
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

      this.totalResults = response.data.totalResults || 0;
      this.entries = response.data.entry || [];

      this.onList();
    } catch (error) {
      this.response = ErrorConverter.convert(error);
    }

    // in case we are not at a specific route redirect to the first
    const isDetailRoute: boolean|undefined = this.route.routeConfig?.path?.endsWith(':id');
    if (this.entries.length > 0 && this.entries[0].id && isDetailRoute === false && !this.selected) {
      await this.doGet('' + this.entries[0].id);
    }

    this.finishLoading();
  }

  protected getCollectionQuery(): CollectionQuery {
    let query: CollectionQuery = {};
    query.startIndex = (this.page - 1) * this.pageSize;
    query.count = this.pageSize;
    if (this.search) {
      query.search = this.search;
    }
    return query;
  }

  async doGet(id: string) {
    try {
      const response = await this.get(id);

      this.selected = response.data;

      this.onGet();
    } catch (error) {
      this.response = ErrorConverter.convert(error);
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

  openCreateDialog() {
    const modalRef = this.modalService.open(this.getDetailComponent(), {
      size: 'lg'
    });
    modalRef.componentInstance.mode = Mode.Create;
    modalRef.closed.subscribe(async (response) => {
      this.response = response;
      if (response.success) {
        await this.doList();
      }
    })
  }

  openUpdateDialog(entity: T) {
    const modalRef = this.modalService.open(this.getDetailComponent(), {
      size: 'lg'
    });
    modalRef.componentInstance.mode = Mode.Update;
    modalRef.componentInstance.entity = entity;
    modalRef.closed.subscribe(async (response) => {
      this.response = response;
      if (response.success) {
        await this.doList();
      }
    })

  }

  openDeleteDialog(entity: T) {
    const modalRef = this.modalService.open(this.getDetailComponent(), {
      size: 'lg'
    });
    modalRef.componentInstance.mode = Mode.Delete;
    modalRef.componentInstance.entity = entity;
    modalRef.closed.subscribe(async (response) => {
      this.response = response;
      if (response.success) {
        await this.doList();
      }
    })
  }

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

  protected abstract getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<T>>>;
  protected abstract get(id: string): Promise<AxiosResponse<T>>;
  protected abstract getDetailComponent(): any;
  protected abstract getRoute(): string;
  protected onList(): void
  {
  }
  protected onGet(): void
  {
  }

}

export interface QueryParams {
  page?: number
  search?: string
}

export interface ModelId {
  id?: number
}

export enum Mode {
  Create = 1,
  Update,
  Delete,
}
