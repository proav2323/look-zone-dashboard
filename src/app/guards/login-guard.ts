import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { API_URL } from '../../imp';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = async (route, state) => {
  let token = localStorage.getItem('token');
  let router = inject(Router);

  if (!token) {
    return true;
  }

  let res = await fetch(`${API_URL}/auth/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    const HomePage = router.parseUrl('/');
    return new RedirectCommand(HomePage, {
      skipLocationChange: false,
    });
  }

  return true;
};
