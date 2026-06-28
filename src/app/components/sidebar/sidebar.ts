import { Component, computed, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Sidebar as sidebar } from '../../services/sidebar/sidebar';
import { Users } from '../../services/users';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [MatIcon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  router = inject(Router);
  userService = inject(Users);
  sidebarService = inject(sidebar);
  isShow: WritableSignal<boolean> = signal(true);
  isOpen: Signal<boolean> = computed(() => this.sidebarService.isOpen());
  isUserLoading: Signal<boolean> = computed(() => this.userService.isLoading());
  url: WritableSignal<string> = signal('/');

  constructor() {
    this.router.events.subscribe(() => {
      if (this.router.url === '/login') {
        this.isShow.set(false);
      } else {
        this.isShow.set(true);
      }

      this.url.set(this.router.url);
    });
  }

  redirect(url: string) {
    this.router.navigateByUrl(url);
  }
}
