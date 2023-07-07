import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {ConsumerService} from "../service/consumer.service";

export const isAuthenticated = () => {
  const consumer = inject(ConsumerService);
  const router = inject(Router);

  if (consumer.hasValidToken()) {
    return true;
  } else {
    return router.createUrlTree(['login']);
  }
};
