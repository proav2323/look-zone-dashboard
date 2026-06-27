import { Service, signal, WritableSignal, inject } from '@angular/core';
import { user } from '../../models/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RedirectCommand, Router } from '@angular/router';

@Service()
export class Users {
  user: WritableSignal<user | undefined> = signal(undefined);
  token: string | null = localStorage.getItem('token');
  isLoggedIn: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);

  private API_URL = 'https://look-zone-backend.onrender.com';
  private http = inject(HttpClient);
  private router = inject(Router);

  auth() {
    if (this.token === null) {
      const loginPath = this.router.parseUrl('/login');
      new RedirectCommand(loginPath, { skipLocationChange: true });
      return;
    }
    this.isLoading.set(true);
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    let req = this.http.get<user>(`${this.API_URL}/auth/`, { headers: headers });

    req.subscribe({
      next: (data) => {
        this.user.set(data);
        this.isLoggedIn.set(true);
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse | undefined) => {
        if (err) {
          console.log(err);
        }
        this.isLoading.set(false);
        const loginPath = this.router.parseUrl('/login');
        new RedirectCommand(loginPath, { skipLocationChange: true });
      },
    });
  }

  login() {}
  signUp() {}
  getUserByid() {}
  changeRoles() {}
}
