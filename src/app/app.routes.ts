import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth/auth-guard';
import { Home } from './components/home/home';

export const routes: Routes = [
  { component: Login, path: 'login' },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    component: Home,
    children: [
      { path: 'dashboard', redirectTo: '/' },
      { path: 'orders', component: Home },
    ],
  },
];
