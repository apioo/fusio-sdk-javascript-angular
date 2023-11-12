import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {FusioService} from "../service/fusio.service";

export const isAuthenticated = () => {
  const consumer = inject(FusioService);
  const router = inject(Router);

  if (consumer.hasValidToken()) {
    return true;
  } else {
    return router.createUrlTree(['login']);
  }
};
