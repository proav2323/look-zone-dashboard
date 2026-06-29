import { Component, Input, signal, WritableSignal } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-field',
  imports: [MatIcon, FormField],
  templateUrl: './field.html',
  styleUrl: './field.css',
})
export class Field {
  @Input() Field!: FieldTree<string, string, 'writable'>;
  @Input() type!: string;
  @Input() icon!: string;
  @Input() placeholder!: string;

  inputType: WritableSignal<string> = signal(this.type);

  constructor() {}

  togglePassword() {
    if (this.inputType() === 'text' && this.inputType() !== undefined) {
      this.inputType.set('password');
    } else {
      this.inputType.set('text');
    }
  }
}
