import { Component, computed, inject } from '@angular/core';
import { Toaster } from '../../services/toaster';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-toast',
  imports: [MatIcon],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  toasterService = inject(Toaster);
  showToast = computed(() => this.toasterService.showingToast());
  message = computed(() => this.toasterService.message());
  type = computed(() => this.toasterService.type());

  closeToast() {
    this.toasterService.hideToast();
  }
}
