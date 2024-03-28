import {Component} from '@angular/core';
import {Client} from "fusio-sdk/dist/Client";
import {Modal} from "../../../abstract/modal";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";
import {ConsumerToken} from "fusio-sdk/dist/ConsumerToken";
import {ConsumerTokenCreate} from "fusio-sdk/dist/ConsumerTokenCreate";
import {ConsumerTokenUpdate} from "fusio-sdk/dist/ConsumerTokenUpdate";
import {ConsumerTokenAccessToken} from "fusio-sdk/dist/ConsumerTokenAccessToken";
import {ConsumerScope} from "fusio-sdk/dist/ConsumerScope";
import {FusioService} from "../../../service/fusio.service";
import {ErrorService} from "../../../service/error.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

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

    return {
      success: true,
      message: '',
    };
  }

  protected async update(entity: ConsumerToken): Promise<CommonMessage> {
    const accessToken = await this.fusio.getClient().consumer().token().update('' + entity.id, <ConsumerTokenUpdate> entity);

    return {
      success: true,
      message: '',
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
