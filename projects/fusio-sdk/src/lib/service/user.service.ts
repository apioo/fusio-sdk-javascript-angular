import {Injectable} from '@angular/core';
import {ConsumerUserAccount} from "fusio-sdk/dist/src/ConsumerUserAccount";
import {FusioService} from "./fusio.service";
import {EventService} from "./event.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user?: ConsumerUserAccount;

  constructor(private fusio: FusioService, private event: EventService) { }

  public login(user: ConsumerUserAccount): void {
    this.user = user;
    sessionStorage.setItem('fusio_user', JSON.stringify(user));

    this.event.dispatchLogin(user);
  }

  public get(): ConsumerUserAccount|undefined {
    if (!this.fusio.hasValidToken()) {
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
    this.fusio.logout();

    this.event.dispatchLogout();
  }

}
