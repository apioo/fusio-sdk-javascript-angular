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

  selectAll = signal<boolean>(false);
  selected = signal<Record<string, boolean>>({});

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

      this.page.set(page || 1);
      this.search.set(search || '');

      await this.doList();
    });
  }

  async doList() {
    const service = await this.getService().onReady();

    try {
      const response = await service.getAll(this.collectionQuery());

      this.totalResults.set(response.totalResults || 0);
      this.entries.set(response.entry || []);
      this.selected.set(await this.getSelectedValues(false));

      this.onLoad();
    } catch (error) {
      this.response.set(this.error.convert(error));

      this.onError();
    }
  }

  async doSearch(page?: number, search?: string) {
    const service = await this.getService().onReady();

    await this.router.navigate(service.getLink(), {
      queryParams: {
        page: page,
        search: search,
      }
    });
  }

  public async doDetail(id: any): Promise<void>
  {
    const service = await this.getService().onReady();

    const link = service.getLink();
    link.push('' + id);

    await this.router.navigate(link);
  }

  public async doNew(): Promise<void>
  {
    const service = await this.getService().onReady();

    const link = service.getLink();
    link.push('-');
    link.push('new');

    await this.router.navigate(link);
  }

  public async doEdit(id: any): Promise<void>
  {
    const service = await this.getService().onReady();

    const link = service.getLink();
    link.push('' + id);
    link.push('edit');

    await this.router.navigate(link);
  }

  public async doDelete(id: any): Promise<void>
  {
    const service = await this.getService().onReady();

    const link = service.getLink();
    link.push('' + id);
    link.push('delete');

    await this.router.navigate(link);
  }

  async doSelect(entry: T) {
    const service = await this.getService().onReady();
    const id = service.getIdValue(entry);
    if (!id) {
      return;
    }

    this.selected.update((selected) => {
      selected[id] = !selected[id];
      return selected;
    });
  }

  async toggleSelectAll() {
    this.selectAll.set(!this.selectAll());
    this.selected.set(await this.getSelectedValues(this.selectAll()));
  }

  batchDisabled(): boolean {
    for (const value of Object.values(this.selected())) {
      if (value) {
        return false;
      }
    }

    return true;
  }

  protected abstract getService(): Service<T>;

  protected onLoad(): void
  {
  }

  protected onError(): void
  {
  }

  private async getSelectedValues(value: boolean): Promise<Record<string, boolean>> {
    const service = await this.getService().onReady();

    const selected: Record<string, boolean> = {};
    this.entries().forEach((entry) => {
      const id = service.getIdValue(entry);
      if (id) {
        selected[id] = value;
      }
    });

    return selected;
  }
}
