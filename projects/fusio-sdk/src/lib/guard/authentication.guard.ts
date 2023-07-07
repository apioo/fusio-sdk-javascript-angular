import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {ConsumerService} from "../service/consumer.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {

  constructor(private consumer: ConsumerService, private router: Router) {
  }

  isAuthenticated(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.consumer.hasValidToken()) {
      return true;
    } else {
      return this.router.createUrlTree(['login']);
    }
  }

}
