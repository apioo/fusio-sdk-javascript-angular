import {Injectable} from '@angular/core';
import {ConsumerUserAccount} from "fusio-sdk";
import {FusioService} from "./fusio.service";
import {EventService} from "./event.service";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fusio: FusioService, private config: ConfigService) { }

  public login(user: ConsumerUserAccount): void {
    sessionStorage.setItem(this.getKey(), JSON.stringify(user));
  }

  public get(): ConsumerUserAccount|undefined {
    if (!this.isAuthenticated()) {
      return undefined;
    }

    const rawData = sessionStorage.getItem(this.getKey());
    if (!rawData) {
      return undefined;
    }

    return JSON.parse(rawData);
  }

  public isAuthenticated(): boolean {
    return this.fusio.hasValidToken();
  }

  public logout(): void {
    sessionStorage.removeItem(this.getKey());
    this.fusio.logout();
  }

  private getKey(): string {
    const instance = this.config.getInstance();
    if (instance !== undefined) {
      return 'fusio_user_' + instance;
    } else {
      return 'fusio_user';
    }
  }
}
