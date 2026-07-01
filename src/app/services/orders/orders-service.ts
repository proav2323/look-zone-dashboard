import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service, signal, WritableSignal } from '@angular/core';
import { API_URL } from '../../../imp';
import { order } from '../../../models/order';
import { Toaster } from '../../services/toaster';

@Service()
export class OrdersService {
  isLoading: WritableSignal<boolean> = signal(false);
  errorOccured: WritableSignal<string | null> = signal(null);
  httpClient = inject(HttpClient);
  API_URL = API_URL;
  token = localStorage.getItem('token');
  orders: WritableSignal<order[]> = signal([]);
  order: WritableSignal<order | null> = signal(null);
  toastService = inject(Toaster);

  getAllOrders() {
    if (!this.token) {
      return;
    }
    this.isLoading.set(true);
    let newHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.httpClient.get<order[]>(`${this.API_URL}/orders/`, { headers: newHeaders }).subscribe({
      next: (data) => {
        this.errorOccured.set(null);
        this.orders.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorOccured.set(err.message);
        this.isLoading.set(false);
      },
    });
  }

  getFilterOrders(status: string | null, dateStart: Date | null, dateEnd: Date | null) {
    if (!this.token) {
      return;
    }
    this.isLoading.set(true);
    let newHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    if (status && !dateStart && !dateEnd) {
      if (status === 'all status') {
        this.getAllOrders();
        return;
      }
      this.httpClient
        .get<order[]>(`${this.API_URL}/orders/status?search=${status}`, { headers: newHeaders })
        .subscribe({
          next: (data) => {
            this.errorOccured.set(null);
            this.orders.set(data);
            this.isLoading.set(false);
          },
          error: (err) => {
            this.errorOccured.set(err.message);
            this.toastService.showToast(err.error, 'error');
            this.isLoading.set(false);
          },
        });
    } else if (!status && dateStart && dateEnd) {
      this.httpClient
        .get<
          order[]
        >(`${this.API_URL}/orders/date?dateStart=${dateStart}&dateEnd=${dateEnd}`, { headers: newHeaders })
        .subscribe({
          next: (data) => {
            this.errorOccured.set(null);
            this.orders.set(data);
            this.isLoading.set(false);
          },
          error: (err) => {
            this.errorOccured.set(err.message);
            this.toastService.showToast(err.error, 'error');
            this.isLoading.set(false);
          },
        });
    } else if (status && dateStart && dateEnd) {
      if (status === 'all status') {
        this.httpClient
          .get<
            order[]
          >(`${this.API_URL}/orders/date?dateStart=${dateStart}&dateEnd=${dateEnd}`, { headers: newHeaders })
          .subscribe({
            next: (data) => {
              this.errorOccured.set(null);
              this.orders.set(data);
              this.isLoading.set(false);
            },
            error: (err) => {
              this.errorOccured.set(err.message);
              this.toastService.showToast(err.error, 'error');
              this.isLoading.set(false);
            },
          });
        return;
      }
      this.httpClient
        .get<order[]>(
          `${this.API_URL}/orders/filter?status=${status}&dateStart=${dateStart}&dateEnd=${dateEnd}`,
          {
            headers: newHeaders,
          },
        )
        .subscribe({
          next: (data) => {
            this.errorOccured.set(null);
            this.orders.set(data);
            this.isLoading.set(false);
          },
          error: (err) => {
            this.errorOccured.set(err.message);
            this.toastService.showToast(err.error, 'error');
            this.isLoading.set(false);
          },
        });
    }
  }

  changeStatus(orderId: string, status: string, loading: WritableSignal<boolean>) {
    if (!this.token) {
      return;
    }
    loading.set(true);
    let newHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.httpClient
      .put<order>(
        `${this.API_URL}/orders/status/${orderId}`,
        { status: status },
        { headers: newHeaders, responseType: 'text' },
      )
      .subscribe({
        next: (data) => {
          this.errorOccured.set(null);
          this.toastService.showToast('Status updated successfully', 'success');
          loading.set(false);
          this.getAllOrders();
        },
        error: (err) => {
          this.errorOccured.set(err.message);
          this.toastService.showToast(err.error, 'error');
          loading.set(false);
        },
      });
  }

  getOrderByIdSub(orderId: string) {
    if (!this.token) {
      return null;
    }
    let newHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.httpClient.get<order>(`${this.API_URL}/orders/order/${orderId}`, {
      headers: newHeaders,
    });
  }
}
