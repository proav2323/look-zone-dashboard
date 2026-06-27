import { Component, computed, Signal } from '@angular/core';
import { Users } from '../../services/users';
import { Loader } from '../loader/loader';

@Component({
  selector: 'app-home',
  imports: [Loader],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(public userService: Users) {}

  isLoading: Signal<boolean> = computed(() => this.userService.isLoading());
}
