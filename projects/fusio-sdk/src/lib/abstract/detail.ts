import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommonMessage} from "fusio-sdk";
import {ErrorService} from "../service/error.service";
import {Service} from "./service";

/**
 * Base component to show a detail page of a single entity
 */
@Component({
  template: '',
})
export abstract class Detail<T> implements OnInit {

  selected = signal<T|undefined>(undefined);
  response = signal<CommonMessage|undefined>(undefined);
  jsonView = signal(false);

  protected constructor(protected route: ActivatedRoute, public router: Router, protected error: ErrorService) {
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id) {
        await this.doGet(id);
      }
    });
  }

  async doGet(id: string) {
    this.getService().onReady().then(async (service) => {
      try {
        this.selected.set(await service.get(id));

        this.onLoad();
      } catch (error) {
        this.response.set(this.error.convert(error));

        this.onError();
      }
    });
  }

  public doList(): void
  {
    this.getService().onReady().then((service) => {
      this.router.navigate(service.getLink());
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

  protected abstract getService(): Service<T>;

  protected onLoad(): void
  {
  }

  protected onError(): void
  {
  }
}
