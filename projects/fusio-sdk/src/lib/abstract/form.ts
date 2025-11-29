import {Component, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommonMessage} from "fusio-sdk";
import {ErrorService} from "../service/error.service";
import {Service} from "./service";

/**
 * Base component to provide a form to create, update or delete an entity
 */
@Component({
  template: '',
})
export abstract class Form<T> implements OnInit {

  entity!: WritableSignal<T>;
  response = signal<CommonMessage|undefined>(undefined);
  mode: Mode = Mode.Create;

  protected constructor(protected route: ActivatedRoute, public router: Router, protected error: ErrorService) {
  }

  async ngOnInit(): Promise<void> {
    this.entity = signal<T>(this.getService().newEntity());

    this.route.data.subscribe((data) => {
      this.mode = data['mode'];
      if (this.mode === Mode.Create) {
        // invoke onload since we dont use the doGet method
        this.onLoad();
      }
    });

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
        this.entity.set(await service.get(id));

        this.onLoad();
      } catch (error) {
        this.response.set(this.error.convert(error));

        this.onError();
      }
    });
  }

  async doCreate(entity: T|Signal<T>) {
    this.getService().onReady().then(async (service) => {
      try {
        const payload = entity instanceof Function ? entity() : entity;

        this.response.set(await service.create(this.beforeCreate(payload)));

        this.onSubmit();
      } catch (error) {
        this.response.set(this.error.convert(error));

        this.onError();
      }
    });
  }

  async doUpdate(entity: T|Signal<T>) {
    this.getService().onReady().then(async (service) => {
      try {
        const payload = entity instanceof Function ? entity() : entity;

        this.response.set(await service.update(this.beforeUpdate(payload)));

        this.onSubmit();
      } catch (error) {
        this.response.set(this.error.convert(error));

        this.onError();
      }
    });
  }

  async doDelete(entity: T|Signal<T>) {
    this.getService().onReady().then(async (service) => {
      try {
        const payload = entity instanceof Function ? entity() : entity;

        this.response.set(await service.delete(this.beforeDelete(payload)));

        this.onSubmit();
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

  public doDetail(id: any): void
  {
    this.getService().onReady().then((service) => {
      const link = service.getLink();
      link.push('' + id)

      this.router.navigate(link);
    });
  }

  public set(entity: WritableSignal<T>, key: keyof T, propertyValue: any) {
    entity.update((entity: T) => {
      entity[key] = propertyValue;

      return entity;
    });
  }

  protected abstract getService(): Service<T>;

  protected onLoad(): void
  {
  }

  protected onSubmit(): void
  {
  }

  protected onError(): void
  {
  }

  protected beforeCreate(entity: T): T
  {
    return entity;
  }

  protected beforeUpdate(entity: T): T
  {
    return entity;
  }

  protected beforeDelete(entity: T): T
  {
    return entity;
  }
}

export enum Mode {
  Create = 1,
  Update,
  Delete,
}
