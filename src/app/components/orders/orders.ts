import { Component, computed, inject, Signal } from '@angular/core';
import { Card } from '../card/card';
import { OrdersService } from '../../services/orders/orders-service';
import { Loader } from '../loader/loader';
import { order } from '../../../models/order';

@Component({
  selector: 'app-orders',
  imports: [Card, Loader],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  ordersService = inject(OrdersService);
  isLoading: Signal<boolean> = computed(() => this.ordersService.isLoading());
  error: Signal<string | null> = computed(() => this.ordersService.errorOccured());
  orders: Signal<order[]> = computed(() => this.ordersService.orders());

  constructor() {
    this.ordersService.getAllOrders();
  }
}
