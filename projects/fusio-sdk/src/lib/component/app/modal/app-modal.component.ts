import {Component} from '@angular/core';
import {Modal} from "../../../abstract/modal";
import {Client} from "fusio-sdk/dist/src/generated/consumer/Client";
import {App} from "fusio-sdk/dist/src/generated/consumer/App";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {AppCreate} from "fusio-sdk/dist/src/generated/consumer/AppCreate";
import {AppUpdate} from "fusio-sdk/dist/src/generated/consumer/AppUpdate";
import {Scope} from "fusio-sdk/dist/src/generated/consumer/Scope";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConsumerService} from "../../../service/consumer.service";
import {ErrorService} from "../../../service/error.service";

@Component({
  selector: 'fusio-app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.css']
})
export class AppModalComponent extends Modal<Client, App> {

  scopes?: Array<Scope>;

  constructor(fusio: ConsumerService, error: ErrorService, modalService: NgbModal, modal: NgbActiveModal) {
    super(fusio, error, modalService, modal);
  }

  override async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().scope().getAll(0, 1024);
    this.scopes = response.entry;
  }

  protected async create(entity: App): Promise<Message> {
    return this.fusio.getClient().app().create(<AppCreate> entity);
  }

  protected async update(entity: App): Promise<Message> {
    return this.fusio.getClient().app().update('' + entity.id, <AppUpdate> entity);
  }

  protected async delete(entity: App): Promise<Message> {
    return this.fusio.getClient().app().delete('' + entity.id);
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
