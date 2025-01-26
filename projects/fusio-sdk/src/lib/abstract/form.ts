import {Component, OnInit} from '@angular/core';
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

  public entity?: T;
  public response?: CommonMessage;
  public mode: Mode = Mode.Create;

  protected constructor(protected route: ActivatedRoute, public router: Router, protected error: ErrorService) {
  }

  async ngOnInit(): Promise<void> {
    this.entity = this.getService().newEntity();

    this.route.data.subscribe((data) => {
      this.mode = data['mode'];
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
      this.entity = await this.getService().get(id);

      this.onLoad();
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async doCreate(entity: T) {
    try {
      this.response = await this.getService().create(entity);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async doUpdate(entity: T) {
    try {
      this.response = await this.getService().update(entity);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async doDelete(entity: T) {
    try {
      this.response = await this.getService().delete(entity);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  public getListLink(): Array<string>
  {
    return this.getService().getLink();
  }

  protected abstract getService(): Service<T>;

  protected onLoad(): void
  {
  }
}

export enum Mode {
  Create = 1,
  Update,
  Delete,
}
