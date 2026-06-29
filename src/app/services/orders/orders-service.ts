import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service, signal, WritableSignal } from '@angular/core';
import { API_URL } from '../../../imp';
import { order } from '../../../models/order';

@Service()
export class OrdersService {
  isLoading: WritableSignal<boolean> = signal(false);
  errorOccured: WritableSignal<string | null> = signal(null);
  httpClient = inject(HttpClient);
  API_URL = API_URL;
  token = localStorage.getItem('token');
  orders: WritableSignal<order[]> = signal([]);

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
}
