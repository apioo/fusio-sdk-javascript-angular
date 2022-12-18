import {Injectable} from '@angular/core';
import {UserAccount} from "fusio-sdk/dist/src/generated/consumer/UserAccount";
import {ConfigService} from "./config.service";
import {EventListener} from "../config/config";
import {Plan} from "fusio-sdk/dist/src/generated/consumer/Plan";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventListener: EventListener;

  constructor(config: ConfigService) {
    this.eventListener = config.getEventListener();
  }

  public dispatchLogin(user: UserAccount): void {
    if (this.eventListener.login) {
      this.eventListener.login.call(this, user);
    }
  }

  public dispatchLogout(): void {
    if (this.eventListener.logout) {
      this.eventListener.logout.call(this);
    }
  }

  public dispatchRegister(name: string, email: string): void {
    if (this.eventListener.register) {
      this.eventListener.register.call(this, name, email);
    }
  }

  public dispatchRegisterActivate(): void {
    if (this.eventListener.register_activate) {
      this.eventListener.register_activate.call(this);
    }
  }

  public dispatchPasswordConfirm(): void {
    if (this.eventListener.password_confirm) {
      this.eventListener.password_confirm.call(this);
    }
  }

  public dispatchPasswordReset(): void {
    if (this.eventListener.password_reset) {
      this.eventListener.password_reset.call(this);
    }
  }

  public dispatchCheckout(plan: Plan): void {
    if (this.eventListener.checkout) {
      this.eventListener.checkout.call(this, plan);
    }
  }

  public dispatchPurchase(plan: Plan): void {
    if (this.eventListener.purchase) {
      this.eventListener.purchase.call(this, plan);
    }
  }

  public dispatchError(error: Message): void {
    if (this.eventListener.error) {
      this.eventListener.error.call(this, error);
    }
  }

  public dispatchModelList(route: string): void {
    if (this.eventListener.model_list) {
      this.eventListener.model_list.call(this, route);
    }
  }

  public dispatchModelDetail(model: any, route: string): void {
    if (this.eventListener.model_detail) {
      this.eventListener.model_detail.call(this, model, route);
    }
  }

  public dispatchModelCreated(model: any, route: string): void {
    if (this.eventListener.model_created) {
      this.eventListener.model_created.call(this, model, route);
    }
  }

  public dispatchModelUpdated(model: any, route: string): void {
    if (this.eventListener.model_updated) {
      this.eventListener.model_updated.call(this, model, route);
    }
  }

  public dispatchModelDeleted(model: any, route: string): void {
    if (this.eventListener.model_deleted) {
      this.eventListener.model_deleted.call(this, model, route);
    }
  }

}
