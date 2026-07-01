import { Component, computed, inject, Input, signal, WritableSignal } from '@angular/core';
import { OrdersService } from '../../services/orders/orders-service';
import { Users } from '../../services/users';
import { Products } from '../../services/products';
import { Loader } from '../loader/loader';
import { user } from '../../../models/user';
import { product } from '../../../models/product';
import { Observable } from 'rxjs';
import { order } from '../../../models/order';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-details',
  imports: [Loader, MatIconModule],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails {
  @Input() orderId?: string | null = null;
  @Input() closeDetails: () => void = () => {};

  usersService = inject(Users);
  ordersService = inject(OrdersService);
  productsService = inject(Products);

  isLoading = signal(false);

  order = computed(() => this.ordersService.order());
  orderUser: WritableSignal<user | null> = signal(null);
  products: WritableSignal<product[]> = signal([]);
  error: WritableSignal<string | null> = signal(null);

  ngOnInit() {
    this.error.set(null);
    if (this.orderId) {
      let orderSub: Observable<order> | null = this.ordersService.getOrderByIdSub(this.orderId);
      if (orderSub) {
        this.isLoading.set(true);
        orderSub.subscribe({
          next: (order) => {
            this.ordersService.order.set(order);
            if (order.userId) {
              this.usersService.getUserByid(order.userId).subscribe({
                next: (user) => {
                  this.orderUser.set(user);
                  order.cart.products.forEach((id) => {
                    this.productsService.getProductById(id.id).subscribe({
                      next: (products) => {
                        this.products.update((value) => [...value, products]);
                        this.isLoading.set(false);
                      },
                      error: (err: any) => {
                        this.error.set(err.message);
                        this.isLoading.set(false);
                      },
                    });
                  });
                },
              });
            }
          },
          error: (err) => {
            this.error.set(err.message);
            this.isLoading.set(false);
          },
        });
      }
    }
  }
}
