import { Service, signal, WritableSignal, inject } from '@angular/core';
import { user } from '../../models/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RedirectCommand, Router } from '@angular/router';
import { API_URL } from '../../imp';
import { Toaster } from './toaster';

@Service()
export class Users {
  user: WritableSignal<user | undefined> = signal(undefined);
  token: string | null = localStorage.getItem('token');
  isLoggedIn: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  API_URL = API_URL;

  private http = inject(HttpClient);
  private router = inject(Router);
  private toastService = inject(Toaster);

  auth(fromLogin?: boolean) {
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

          if (fromLogin === true) {
            this.toastService.showToast('login successfull', 'success');
            const HomePage = this.router.parseUrl('/');
            this.router.navigateByUrl(HomePage, { skipLocationChange: false });
          }
        } else {
          this.isLoading.set(false);
          localStorage.removeItem('token');
          if (fromLogin === false || fromLogin === undefined) {
            const loginPath = this.router.parseUrl('/login');
            this.router.navigateByUrl(loginPath, { skipLocationChange: false });
          } else {
            this.toastService.showToast('you have no access to view the dashboard', 'error');
          }
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        if (fromLogin === false || fromLogin === undefined) {
          const loginPath = this.router.parseUrl('/login');
          this.router.navigateByUrl(loginPath, { skipLocationChange: false });
        } else {
          this.toastService.showToast(err.error, 'error');
        }
      },
    });
  }

  login(email: string, password: string) {
    this.isLoading.set(true);
    this.http
      .post<any>(
        `${API_URL}/auth/login`,
        { email: email, password: password },
        { responseType: 'text' },
      )
      .subscribe({
        next: (token) => {
          localStorage.setItem('token', token);
          this.token = token;
          this.auth(true);
        },
        error: (err) => {
          console.log(err);
          this.isLoading.set(false);
          this.toastService.showToast(err.error, 'error');
        },
      });
  }

  getUserByid() {}
  changeRoles() {}
}
