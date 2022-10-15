import {Injectable} from '@angular/core';
import {UserAccount} from "fusio-sdk/dist/src/generated/consumer/UserAccount";
import {ConsumerService} from "./consumer.service";
import {EventService} from "./event.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user?: UserAccount;

  constructor(private consumer: ConsumerService, private event: EventService) { }

  public login(user: UserAccount): void {
    this.user = user;
    sessionStorage.setItem('fusio_user', JSON.stringify(user));

    this.event.dispatchLogin(user);
  }

  public get(): UserAccount|undefined {
    if (!this.consumer.hasValidToken()) {
      return undefined;
    }

    if (this.user) {
      return this.user;
    }

    const rawData = sessionStorage.getItem('fusio_user');
    if (!rawData) {
      return undefined;
    }

    return JSON.parse(rawData);
  }

  public logout(): void {
    this.user = undefined;
    sessionStorage.removeItem('fusio_user');
    this.consumer.logout();

    this.event.dispatchLogout();
  }

}
