import { Service, signal, WritableSignal } from '@angular/core';

@Service()
export class Toaster {
  showingToast: WritableSignal<boolean> = signal(false);
  message: WritableSignal<string> = signal('');
  type: WritableSignal<'success' | 'error'> = signal('error');

  showToast(msg: string, type: 'success' | 'error') {
    this.hideToast();
    this.showingToast.set(true);
    this.message.set(msg);
    this.type.set(type);

    setTimeout(() => {
      this.hideToast();
    }, 5000);
  }

  hideToast() {
    this.showingToast.set(false);
  }
}
