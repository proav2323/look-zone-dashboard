import { Component, input, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  imports: [MatIcon],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  icon = input('');
  text = input('');
  number = input('');
  iconBackgroundColor = input('');
  iconColor = input('');
}
