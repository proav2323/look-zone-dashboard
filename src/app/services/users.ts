import { Service, signal, WritableSignal, inject } from '@angular/core';
import { user } from '../../models/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RedirectCommand, Router } from '@angular/router';
import { API_URL } from '../../imp';

@Service()
export class Users {
  user: WritableSignal<user | undefined> = signal(undefined);
  token: string | null = localStorage.getItem('token');
  isLoggedIn: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  API_URL = API_URL;

  private http = inject(HttpClient);
  private router = inject(Router);

  auth() {
    if (this.token === null) {
      const loginPath = this.router.parseUrl('/login');
      this.router.navigateByUrl(loginPath, { skipLocationChange: false });
      return;
    }
    this.isLoading.set(true);
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    let req = this.http.get<user>(`${this.API_URL}/auth/`, { headers: headers });

    req.subscribe({
      next: (data) => {
        if (data.admin === true || data.canEdit === true || data.canView === true) {
          this.user.set(data);
          this.isLoggedIn.set(true);
          this.isLoading.set(false);
        } else {
          this.isLoading.set(false);
          localStorage.removeItem('token');
          const loginPath = this.router.parseUrl('/login');
          this.router.navigateByUrl(loginPath, { skipLocationChange: false });
        }
      },
      error: (err: HttpErrorResponse | undefined) => {
        console.log(err);
        this.isLoading.set(false);
        const loginPath = this.router.parseUrl('/login');
        this.router.navigateByUrl(loginPath, { skipLocationChange: false });
      },
    });
  }

  login() {}
  getUserByid() {}
  changeRoles() {}
}
