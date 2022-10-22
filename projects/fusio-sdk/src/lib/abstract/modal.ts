import {Component, Input, OnInit} from "@angular/core";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Mode, ModelId} from "./list";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AxiosResponse} from "axios";
import {FusioService} from "../service/fusio.service";
import {ClientAbstract} from "sdkgen-client";
import {ErrorService} from "../service/error.service";

@Component({
  template: '',
})
export abstract class Modal<C extends ClientAbstract, T extends ModelId> implements OnInit {

  response?: Message;
  loading: boolean = false;

  @Input() mode: Mode = Mode.Create;
  @Input() entity: T = this.newEntity();

  constructor(protected fusio: FusioService<C>, protected error: ErrorService, protected modalService: NgbModal, public modal: NgbActiveModal) { }

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
        this.modal.close({
          entity: data,
          response: response.data,
        });
      }
    } catch (error) {
      this.loading = false;
      this.response = this.error.convert(error);
    }
  }

  protected abstract create(entity: T): Promise<AxiosResponse<Message>|void>;
  protected abstract update(entity: T): Promise<AxiosResponse<Message>|void>;
  protected abstract delete(entity: T): Promise<AxiosResponse<Message>|void>;
  protected abstract newEntity(): T;

}

export interface Result<T> {
  entity: T,
  response: Message,
}
