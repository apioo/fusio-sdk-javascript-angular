import {Component} from '@angular/core';
import {Client, CommonMessage, ConsumerScope, ConsumerToken, ConsumerTokenCreate, ConsumerTokenUpdate} from "fusio-sdk";
import {Modal} from "../../../abstract/modal";
import {FusioService} from "../../../service/fusio.service";
import {ErrorService} from "../../../service/error.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TokenShowComponent} from "../show/token-show.component";

@Component({
  selector: 'fusio-token-modal',
  templateUrl: './token-modal.component.html',
  styleUrls: ['./token-modal.component.css']
})
export class TokenModalComponent extends Modal<Client, ConsumerToken> {

  scopes?: Array<ConsumerScope>;

  constructor(fusio: FusioService, error: ErrorService, modalService: NgbModal, modal: NgbActiveModal) {
    super(fusio, error, modalService, modal);
  }

  override async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().consumer().scope().getAll(0, 1024);
    this.scopes = response.entry;
  }

  protected async create(entity: ConsumerToken): Promise<CommonMessage> {
    const accessToken = await this.fusio.getClient().consumer().token().create(<ConsumerTokenCreate> entity);

    const modalRef = this.modalService.open(TokenShowComponent, {
      size: 'md'
    });
    modalRef.componentInstance.token = accessToken;

    return {
      success: true,
      message: 'Token successfully generated',
    };
  }

  protected async update(entity: ConsumerToken): Promise<CommonMessage> {
    const accessToken = await this.fusio.getClient().consumer().token().update('' + entity.id, <ConsumerTokenUpdate> entity);

    const modalRef = this.modalService.open(TokenShowComponent, {
      size: 'md'
    });
    modalRef.componentInstance.token = accessToken;

    return {
      success: true,
      message: 'Token successfully updated',
    };
  }

  protected async delete(entity: ConsumerToken): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().token().delete('' + entity.id);
  }

  protected newEntity(): ConsumerToken {
    return {
      name: '',
      scopes: [],
    };
  }

  scopeSelect(event: any, scope?: string) {
    const selected = event.target.checked;
    if (!scope) {
      return;
    }

    if (selected) {
      this.addScope(scope);
    } else {
      this.removeScope(scope);
    }
  }

  private addScope(scope: string) {
    this.entity.scopes?.push(scope)
  }

  private removeScope(scope: string) {
    this.entity.scopes = this.entity.scopes?.filter((value) => {
      return value !== scope;
    });
  }

}
