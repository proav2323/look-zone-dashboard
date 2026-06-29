import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  size: InputSignal<'small' | 'large'> = input<'large' | 'small'>('large');
  width: InputSignal<string> = input('');
}
