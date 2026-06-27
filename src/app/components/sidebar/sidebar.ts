import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Sidebar as sidebar } from '../../services/sidebar/sidebar';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  router = inject(Router);
  sidebarService = inject(sidebar);
  isShow: WritableSignal<boolean> = signal(true);
  isOpen: Signal<boolean> = computed(() => this.sidebarService.isOpen());

  constructor() {
    this.router.events.subscribe(() => {
      if (this.router.url === '/login') {
        console.log('done');
        this.isShow.set(false);
      } else {
        this.isShow.set(true);
      }
    });
  }
}
