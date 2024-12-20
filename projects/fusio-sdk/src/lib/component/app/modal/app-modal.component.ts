import {Component} from '@angular/core';
import {Client, CommonMessage, ConsumerApp, ConsumerAppCreate, ConsumerAppUpdate, ConsumerScope} from "fusio-sdk";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Modal} from "../../../abstract/modal";
import {FusioService} from "../../../service/fusio.service";
import {ErrorService} from "../../../service/error.service";

@Component({
  selector: 'fusio-app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.css']
})
export class AppModalComponent extends Modal<Client, ConsumerApp> {

  scopes?: Array<ConsumerScope>;

  constructor(fusio: FusioService, error: ErrorService, modalService: NgbModal, modal: NgbActiveModal) {
    super(fusio, error, modalService, modal);
  }

  override async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().consumer().scope().getAll(0, 1024);
    this.scopes = response.entry;
  }

  protected async create(entity: ConsumerApp): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().app().create(<ConsumerAppCreate> entity);
  }

  protected async update(entity: ConsumerApp): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().app().update('' + entity.id, <ConsumerAppUpdate> entity);
  }

  protected async delete(entity: ConsumerApp): Promise<CommonMessage> {
    return this.fusio.getClient().consumer().app().delete('' + entity.id);
  }

  protected newEntity(): ConsumerApp {
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
