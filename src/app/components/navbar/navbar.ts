import { Component, computed, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Sidebar } from '../../services/sidebar/sidebar';
import { user } from '../../../models/user';
import { Users } from '../../services/users';
import { Theme } from '../../services/theme';

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
  themeService = inject(Theme);
  isShow: WritableSignal<boolean> = signal(false);
  user: Signal<user | undefined> = computed(() => this.usersService.user());
  isDropdownOpen: WritableSignal<boolean> = signal(false);
  theme: Signal<string | null> = computed(() => this.themeService.theme());
  isUserLoading: Signal<boolean> = computed(() => this.usersService.isLoading());

  toggleDropdown() {
    this.isDropdownOpen.update((val) => !val);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  constructor() {
    this.router.events.subscribe(() => {
      if (this.router.url === '/login') {
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
