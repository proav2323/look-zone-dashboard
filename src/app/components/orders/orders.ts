import { Component, computed, inject, signal, Signal } from '@angular/core';
import { Card } from '../card/card';
import { OrdersService } from '../../services/orders/orders-service';
import { Loader } from '../loader/loader';
import { order } from '../../../models/order';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { Theme } from '../../services/theme';
import { Users } from '../../services/users';
import { BehaviorSubject, of, share, switchMap, take } from 'rxjs';
import { UserDisplay } from '../user-display/user-display';
import { OrderDetails } from '../order-details/order-details';

@Component({
  selector: 'app-orders',
  imports: [
    Card,
    Loader,
    MatIcon,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    DatePipe,
    CurrencyPipe,
    UserDisplay,
    OrderDetails,
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  ordersService = inject(OrdersService);
  activatedRoute = inject(ActivatedRoute);
  themeService = inject(Theme);
  router = inject(Router);
  usersService = inject(Users);
  isLoading: Signal<boolean> = computed(() => this.ordersService.isLoading());
  error: Signal<string | null> = computed(() => this.ordersService.errorOccured());
  orders: Signal<order[]> = computed(() => this.ordersService.orders());
  statsSelected = signal('all status');
  theme = computed(() => this.themeService.theme());
  selectedId = signal<string | null>(null);
  showOrderDetailsDisplay = signal(false);
  status: string[] = [
    'all status',
    'ordered',
    'processing',
    'shipped',
    'out for delivery',
    'delivered',
    'canceled',
    'return intiated',
    'returned',
  ];
  select = new FormControl<string>('all status');
  dateStart = new FormControl<string | null>(null);
  dateEnd = new FormControl<string | null>(null);
  loading = signal(false);
  orderStatusSelect = new FormControl<string>('');
  form = new FormGroup({
    status: this.select,
    dateStart: this.dateStart,
    dateEnd: this.dateEnd,
    orderStatusSelect: this.orderStatusSelect,
  });

  constructor() {
    this.getQuery();
    this.select.valueChanges.subscribe((data) => {
      if (data) {
        this.filter('status');
      }
    });

    this.dateStart.valueChanges.subscribe((value) => {
      if (!value || !this.dateEnd.value) {
        return;
      }
      if (this.checkPrvoiesDate(this.dateEnd.value) === true) {
        this.filter('date');
      }
    });

    this.dateEnd.valueChanges.subscribe((value) => {
      if (!value) {
        return;
      }
      if (this.checkPrvoiesDate(value) === true) {
        this.filter('date');
      }
    });
  }

  checkPrvoiesDate(endDate: string) {
    if (!this.dateStart.value) {
      return false;
    }
    if (new Date(this.dateStart.value) < new Date(endDate)) {
      return true;
    } else {
      return false;
    }
  }

  showFilters() {
    let statQuery = this.activatedRoute.snapshot.queryParamMap.get('status');
    let dateStart = this.activatedRoute.snapshot.queryParamMap.get('dateStart');
    let dateEnd = this.activatedRoute.snapshot.queryParamMap.get('dateEnd');

    if (statQuery) {
      this.statsSelected.set(statQuery);
    }

    if (dateStart && dateEnd && !statQuery) {
      this.ordersService.getFilterOrders(null, new Date(dateStart), new Date(dateEnd));
    } else if (statQuery && !dateStart && !dateEnd) {
      this.ordersService.getFilterOrders(statQuery, null, null);
    } else if (statQuery && dateEnd && dateStart) {
      this.ordersService.getFilterOrders(statQuery, new Date(dateStart), new Date(dateEnd));
    }

    if (!statQuery && !dateEnd && !dateStart) {
      this.ordersService.getAllOrders();
    }
  }

  syncQuery() {
    let statQuery = this.activatedRoute.snapshot.queryParamMap.get('status');
    let dateStart = this.activatedRoute.snapshot.queryParamMap.get('dateStart');
    let dateEnd = this.activatedRoute.snapshot.queryParamMap.get('dateEnd');
    if (statQuery) {
      this.statsSelected.set(statQuery);
      this.form.patchValue({
        status: statQuery,
        dateStart: dateStart ? dateStart : null,
        dateEnd: dateEnd ? dateEnd : null,
      });
    }
  }

  getQuery() {
    this.showFilters();
    this.syncQuery();
  }

  filter(e: string) {
    let dateStart = this.activatedRoute.snapshot.queryParamMap.get('dateStart');
    let dateEnd = this.activatedRoute.snapshot.queryParamMap.get('dateEnd');
    let status = this.activatedRoute.snapshot.queryParamMap.get('status');
    let newParams: { status: string | null; dateStart: string | null; dateEnd: string | null } = {
      status: null,
      dateEnd: null,
      dateStart: null,
    };

    if (dateStart) {
      newParams['dateStart'] = dateStart;
    }

    if (dateEnd) {
      newParams['dateEnd'] = dateEnd;
    }

    if (status) {
      newParams['status'] = status;
    }

    if (e === 'status' && this.select.value) {
      newParams['status'] = this.select.value;
    }

    if (e === 'date' && this.dateStart.value && this.dateEnd.value) {
      newParams['dateStart'] = this.dateStart.value;
      newParams['dateEnd'] = this.dateEnd.value;
    }

    this.router
      .navigate(['/admin/orders'], {
        queryParams: newParams,
      })
      .then(() => {
        this.showFilters();
      });
  }

  changeStatus(event: Event, orderId: string) {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;

    this.ordersService.changeStatus(orderId, newStatus, this.loading);
  }

  showOrderDetails(orderId: string) {
    this.selectedId.set(orderId);
    this.showOrderDetailsDisplay.set(true);
  }

  closeDeatils() {
    console.log('hello');
    this.showOrderDetailsDisplay.set(false);
  }
}
