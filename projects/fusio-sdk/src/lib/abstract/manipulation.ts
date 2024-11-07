import {Component, Input, OnInit} from "@angular/core";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";
import {Mode} from "./list";
import {ClientAbstract} from "sdkgen-client/dist/src/ClientAbstract";
import {ApiService} from "../service/api.service";
import {ErrorService} from "../service/error.service";
import {ModelId} from "./query";

/**
 * Base component if you want to create a panel to create, update or delete an entity. If you extend this class you
 * need to implement the {@see create}, {@see update} and {@see delete} method. This class only uses native angular
 * components so you can use it independently of your UI framework
 */
@Component({
  template: '',
})
export abstract class Manipulation<C extends ClientAbstract, T extends ModelId> implements OnInit {

  response?: CommonMessage;
  loading: boolean = false;

  @Input() mode: Mode = Mode.Create;
  @Input() entity: T = this.newEntity();

  protected fusio: ApiService<C>;
  protected error: ErrorService;

  constructor(fusio: ApiService<C>, error: ErrorService) {
    this.fusio = fusio;
    this.error = error;
  }

  ngOnInit(): void {
  }

  async submit() {
    if (!this.entity) {
      return;
    }

    this.loading = true;

    const data = this.entity;

    try {
      let response;
      if (this.mode === Mode.Create) {
        response = await this.create(data);
      } else if (this.mode === Mode.Update) {
        response = await this.update(data);
      } else if (this.mode === Mode.Delete) {
        response = await this.delete(data);
      }

      this.loading = false;

      if (response) {
        this.onResponse(response, data);
      }
    } catch (error) {
      this.loading = false;
      this.response = this.error.convert(error);
    }
  }

  protected onResponse(response: CommonMessage, entity: T): void {
  }

  protected abstract create(entity: T): Promise<CommonMessage|void>;
  protected abstract update(entity: T): Promise<CommonMessage|void>;
  protected abstract delete(entity: T): Promise<CommonMessage|void>;
  protected abstract newEntity(): T;

}
