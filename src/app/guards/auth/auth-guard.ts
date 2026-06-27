import { computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Users } from '../../services/users';

export const authGuard: CanActivateFn = (route, state) => {
  const USERSERVICE = inject(Users);
  const ROUTER = inject(Router);

  let user = computed(() => USERSERVICE.user());

  if (user() === undefined) {
  }
  return true;
};
