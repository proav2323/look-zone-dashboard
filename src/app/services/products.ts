import { inject, Service, signal, WritableSignal } from '@angular/core';
import { product } from '../../models/product';
import { API_URL } from '../../imp';
import { share, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Service()
export class Products {
  isLoading: WritableSignal<boolean> = signal(false);
  http = inject(HttpClient);

  getProductById(id: string) {
    return this.http.get<product>(`${API_URL}/products/product/${id}`).pipe(share()).pipe(take(1));
  }
}
