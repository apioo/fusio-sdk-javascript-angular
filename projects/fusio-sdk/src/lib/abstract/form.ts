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
    try {
      this.getService().onConfigurationCompleted().then(async (service) => {
        this.entity.set(await service.get(id));

        this.onLoad();
      });
    } catch (error) {
      this.response.set(this.error.convert(error));

      this.onError();
    }
  }

  async doCreate(entity: T|Signal<T>) {
    try {
      this.getService().onConfigurationCompleted().then(async (service) => {
        const payload = entity instanceof Function ? entity() : entity;

        this.response.set(await service.create(this.beforeCreate(payload)));

        this.onSubmit();
      });
    } catch (error) {
      this.response.set(this.error.convert(error));

      this.onError();
    }
  }

  async doUpdate(entity: T|Signal<T>) {
    try {
      this.getService().onConfigurationCompleted().then(async (service) => {
        const payload = entity instanceof Function ? entity() : entity;

        this.response.set(await service.update(this.beforeUpdate(payload)));

        this.onSubmit();
      });
    } catch (error) {
      this.response.set(this.error.convert(error));

      this.onError();
    }
  }

  async doDelete(entity: T|Signal<T>) {
    try {
      this.getService().onConfigurationCompleted().then(async (service) => {
        const payload = entity instanceof Function ? entity() : entity;

        this.response.set(await service.delete(this.beforeDelete(payload)));

        this.onSubmit();
      });
    } catch (error) {
      this.response.set(this.error.convert(error));

      this.onError();
    }
  }

  public getListLink(): Array<string>
  {
    return this.getService().getLink();
  }

  public getDetailLink(id: any): Array<string>
  {
    const link = this.getService().getLink();
    link.push('' + id)
    return link;
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
