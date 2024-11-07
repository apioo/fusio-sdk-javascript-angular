import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ClientAbstract} from "sdkgen-client/dist/src/ClientAbstract";
import {ApiService} from "../service/api.service";
import {ErrorService} from "../service/error.service";
import {EventService} from "../service/event.service";
import {Result} from "./modal";
import {ModelId, Query} from "./query";

/**
 * List panel which uses a modal to CRUD entities. Note it depends on ng-bootstrap so you can use it only if your
 * project also uses ng-bootstrap
 */
@Component({
  template: '',
})
export abstract class List<C extends ClientAbstract, T extends ModelId> extends Query<C, T> {

  protected modalService: NgbModal;

  constructor(fusio: ApiService<C>, route: ActivatedRoute, router: Router, event: EventService, error: ErrorService, modalService: NgbModal) {
    super(fusio, route, router, event, error);
    this.modalService = modalService;
  }

  openCreateDialog() {
    const modalRef = this.modalService.open(this.getDetailComponent(), {
      size: 'lg'
    });
    modalRef.componentInstance.mode = Mode.Create;
    modalRef.closed.subscribe(async (result: Result<T>) => {
      this.response = result.response;
      if (result.response.success) {
        this.event.dispatchModelCreated(result.entity, this.getRoute());

        await this.doList();
      }
    });
  }

  openUpdateDialog(entity: T) {
    const modalRef = this.modalService.open(this.getDetailComponent(), {
      size: 'lg'
    });
    modalRef.componentInstance.mode = Mode.Update;
    modalRef.componentInstance.entity = entity;
    modalRef.closed.subscribe(async (result: Result<T>) => {
      this.response = result.response;
      if (result.response.success) {
        this.event.dispatchModelUpdated(result.entity, this.getRoute());

        await this.doList();
      }
    });
  }

  openDeleteDialog(entity: T) {
    const modalRef = this.modalService.open(this.getDetailComponent(), {
      size: 'lg'
    });
    modalRef.componentInstance.mode = Mode.Delete;
    modalRef.componentInstance.entity = entity;
    modalRef.closed.subscribe(async (result: Result<T>) => {
      this.response = result.response;
      if (result.response.success) {
        this.event.dispatchModelDeleted(result.entity, this.getRoute());

        await this.doList();
      }
    });
  }

  protected abstract getDetailComponent(): any;

}

export enum Mode {
  Create = 1,
  Update,
  Delete,
}
