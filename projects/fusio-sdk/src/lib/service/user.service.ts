import {Injectable} from '@angular/core';
import {FusioService} from "./fusio.service";

@Injectable({
  providedIn: 'root'
})
export class UserService<T> {

  private user?: T;

  constructor(private factory: FusioService<any>) { }

  public login(user: T): void {
    this.user = user;
    sessionStorage.setItem('fusio_user', JSON.stringify(user));
  }

  public get(): T|undefined {
    if (!this.factory.hasValidToken()) {
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
    this.factory.logout();
  }

}
