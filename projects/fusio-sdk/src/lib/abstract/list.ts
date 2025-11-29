import {Component, computed, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommonMessage} from "fusio-sdk";
import {ErrorService} from "../service/error.service";
import {Service} from "./service";

/**
 * Base component to list entities, with a pagination and a search
 */
@Component({
  template: '',
})
export abstract class List<T> implements OnInit {

  search = signal<string>('');
  totalResults = signal<number>(0);
  entries = signal<Array<T>>([]);
  page = signal<number>(1);
  pageSize = signal<number>(16);
  response = signal<CommonMessage|undefined>(undefined);

  collectionQuery = computed<Array<any>>(() => {
    let query: Array<any> = [];
    query.push((this.page() - 1) * this.pageSize());
    query.push(this.pageSize());
    const search = this.search();
    if (search) {
      query.push(search);
    } else {
      query.push('');
    }

    return query;
  });

  protected constructor(protected route: ActivatedRoute, public router: Router, protected error: ErrorService) {
  }

  async ngOnInit(): Promise<void> {
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

      this.page.set(page || 1);
      this.search.set(search || '');

      await this.doList();
    });
  }

  async doList() {
    this.getService().onReady().then(async (service) => {
      try {
        const response = await service.getAll(this.collectionQuery());

        this.totalResults.set(response.totalResults || 0);
        this.entries.set(response.entry || []);

        this.onLoad();
      } catch (error) {
        this.response.set(this.error.convert(error));

        this.onError();
      }
    });
  }

  async doSearch(page?: number, search?: string) {
    if (!this.hasQueryParamsChange(page, search)) {
      return;
    }

    this.getService().onReady().then((service) => {
      this.router.navigate(service.getLink(), {
        queryParams: {
          page: page,
          search: search,
        }
      });
    });
  }

  public doDetail(id: any): void
  {
    this.getService().onReady().then((service) => {
      const link = service.getLink();
      link.push('' + id);

      this.router.navigate(link);
    });
  }

  public doNew(): void
  {
    this.getService().onReady().then((service) => {
      const link = service.getLink();
      link.push('-');
      link.push('new');

      this.router.navigate(link);
    });
  }

  public doEdit(id: any): void
  {
    this.getService().onReady().then((service) => {
      const link = service.getLink();
      link.push('' + id);
      link.push('edit');

      this.router.navigate(link);
    });
  }

  public doDelete(id: any): void
  {
    this.getService().onReady().then((service) => {
      const link = service.getLink();
      link.push('' + id);
      link.push('delete');

      this.router.navigate(link);
    });
  }

  protected hasQueryParamsChange(page?: number, search?: string): boolean {
    return this.page() !== page || this.search() !== search;
  }

  protected abstract getService(): Service<T>;

  protected onLoad(): void
  {
  }

  protected onError(): void
  {
  }
}
