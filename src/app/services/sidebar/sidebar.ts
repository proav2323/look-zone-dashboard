import { Service, signal, WritableSignal } from '@angular/core';

@Service()
export class Sidebar {
  isOpen: WritableSignal<boolean> = signal(true);

  toggle() {
    this.isOpen.update((value) => !value);
  }
}
