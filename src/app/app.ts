import { Component, computed, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Users } from './services/users';
import { routes } from './app.routes';
import { Navbar } from './components/navbar/navbar';
import { Sidebar as SidebarService } from './services/sidebar/sidebar';
import { Sidebar } from './components/sidebar/sidebar';
import { Theme } from './services/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  sidebarService = inject(SidebarService);
  isOpen: Signal<boolean> = computed(() => this.sidebarService.isOpen());
  constructor(userService: Users, themeService: Theme) {
    userService.auth();
    themeService.getTheme();
  }
}
