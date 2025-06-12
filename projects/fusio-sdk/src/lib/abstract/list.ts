import {Component, OnInit} from '@angular/core';
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

  public search: string = '';
  public totalResults: number = 0;
  public entries: Array<T> = [];
  public page: number = 1;
  public pageSize: number = 16;
  public response?: CommonMessage;

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

      this.page = page || 1;
      this.search = search || '';

      await this.doList();
    });
  }

  async doList() {
    try {
      const response = await this.getService().getAll(this.getCollectionQuery());

      this.totalResults = response.totalResults || 0;
      this.entries = response.entry || [];

      this.onLoad();
    } catch (error) {
      this.response = this.error.convert(error);

      this.onError();
    }
  }

  async doSearch(page?: number, search?: string) {
    if (!this.hasQueryParamsChange(page, search)) {
      return;
    }

    await this.router.navigate(this.getService().getLink(), {
      queryParams: {
        page: page,
        search: search,
      }
    });
  }

  public getDetailLink(id: any): Array<string>
  {
    const link = this.getService().getLink();
    link.push('' + id)
    return link;
  }

  public getNewLink(): Array<string>
  {
    const link = this.getService().getLink();
    link.push('-')
    link.push('new')
    return link;
  }

  public getEditLink(id: any): Array<string>
  {
    const link = this.getService().getLink();
    link.push('' + id)
    link.push('edit')
    return link;
  }

  public getDeleteLink(id: any): Array<string>
  {
    const link = this.getService().getLink();
    link.push('' + id)
    link.push('delete')
    return link;
  }

  protected getCollectionQuery(): Array<any> {
    let query: Array<any> = [];
    query.push((this.page - 1) * this.pageSize);
    query.push(this.pageSize);
    if (this.search) {
      query.push(this.search);
    } else {
      query.push('');
    }
    return query;
  }

  protected hasQueryParamsChange(page?: number, search?: string): boolean {
    return this.page !== page || this.search !== search;
  }

  protected abstract getService(): Service<T>;

  protected onLoad(): void
  {
  }

  protected onError(): void
  {
  }
}
