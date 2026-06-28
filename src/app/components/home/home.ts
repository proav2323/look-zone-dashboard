import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { Users } from '../../services/users';
import { Loader } from '../loader/loader';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Loader, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  url: WritableSignal<string> = signal('');
  routerService = inject(Router);
  constructor(public userService: Users) {
    this.url.set(this.routerService.url);

    this.routerService.events.subscribe(() => {
      this.url.set(this.routerService.url);
    });
  }

  isLoading: Signal<boolean> = computed(() => this.userService.isLoading());
}
