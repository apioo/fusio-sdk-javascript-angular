import {Component} from '@angular/core';
import {Modal} from "../../../abstract/modal";
import Client from "fusio-sdk/dist/src/generated/consumer/Client";
import {App} from "fusio-sdk/dist/src/generated/consumer/App";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {AppCreate} from "fusio-sdk/dist/src/generated/consumer/AppCreate";
import {AppUpdate} from "fusio-sdk/dist/src/generated/consumer/AppUpdate";
import {Scope} from "fusio-sdk/dist/src/generated/consumer/Scope";
import {FusioService} from "../../../service/fusio.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConsumerService} from "../../../service/consumer.service";
import {ErrorService} from "../../../service/error.service";

@Component({
  selector: 'fusio-app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, App> {

  scopes?: Array<Scope>;

  constructor(fusio: ConsumerService, error: ErrorService, modalService: NgbModal, modal: NgbActiveModal) {
    super(fusio, error, modalService, modal);
  }

  override async ngOnInit(): Promise<void> {
    const scope = await this.fusio.getClient().getConsumerScope();
    const response = await scope.consumerActionScopeGetAll({count: 1024});
    this.scopes = response.data.entry;
  }

  protected async create(entity: App): Promise<AxiosResponse<Message>> {
    const app = await this.fusio.getClient().getConsumerApp();
    return await app.consumerActionAppCreate(<AppCreate> entity);
  }

  protected async update(entity: App): Promise<AxiosResponse<Message>> {
    const app = await this.fusio.getClient().getConsumerAppByAppId('' + entity.id);
    return await app.consumerActionAppUpdate(<AppUpdate> entity);
  }

  protected async delete(entity: App): Promise<AxiosResponse<Message>> {
    const app = await this.fusio.getClient().getConsumerAppByAppId('' + entity.id);
    return await app.consumerActionAppDelete();
  }

  protected newEntity(): App {
    return {
      name: '',
      url: '',
      scopes: []
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
