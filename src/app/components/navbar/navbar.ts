import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  router = inject(Router);
  isShow: WritableSignal<boolean> = signal(true);

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
