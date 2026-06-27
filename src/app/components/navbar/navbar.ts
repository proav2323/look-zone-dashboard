import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Sidebar } from '../../services/sidebar/sidebar';
import { user } from '../../../models/user';
import { Users } from '../../services/users';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  router = inject(Router);
  sidebarService = inject(Sidebar);
  usersService = inject(Users);
  isShow: WritableSignal<boolean> = signal(true);
  user: Signal<user | undefined> = computed(() => this.usersService.user());

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

  toggle() {
    this.sidebarService.toggle();
  }
}
