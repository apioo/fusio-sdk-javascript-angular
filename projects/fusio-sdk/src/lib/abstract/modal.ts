import {Component} from "@angular/core";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AxiosResponse} from "axios";
import {ClientAbstract} from "sdkgen-client";
import {FusioService} from "../service/fusio.service";
import {ErrorService} from "../service/error.service";
import {Manipulation} from "./manipulation";
import {ModelId} from "./query";

/**
 * Manipulation panel which uses a modal to create, update or delete an entity. Note it depends on ng-bootstrap so you
 * can use it only if your project also uses ng-bootstrap
 */
@Component({
  template: '',
})
export abstract class Modal<C extends ClientAbstract, T extends ModelId> extends Manipulation<C, T> {

  protected modalService: NgbModal;
  public modal: NgbActiveModal;

  constructor(fusio: FusioService<C>, error: ErrorService, modalService: NgbModal, modal: NgbActiveModal) {
    super(fusio, error);
    this.modalService = modalService;
    this.modal = modal;
  }

  protected onResponse(response: AxiosResponse<Message>, entity: T) {
    this.modal.close({
      entity: entity,
      response: response.data,
    });
  }

}

export interface Result<T> {
  entity: T,
  response: Message,
}
