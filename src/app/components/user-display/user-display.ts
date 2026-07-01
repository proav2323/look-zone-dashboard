import { Component, inject, Input, input, InputSignal } from '@angular/core';
import { user } from '../../../models/user';
import { Users } from '../../services/users';
import { Observable } from 'rxjs';
import { Loader } from '../loader/loader';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-display',
  imports: [AsyncPipe, Loader],
  templateUrl: './user-display.html',
  styleUrl: './user-display.css',
})
export class UserDisplay {
  @Input() id!: string;
  @Input() type: 'user' | 'category' = 'user';
  userService = inject(Users);

  data$: Observable<any> = new Observable<any>();

  ngOnInit() {
    if (this.type === 'user') {
      this.data$ = this.userService.getUserByid(this.id);
    } else {
      // Handle other types if needed
    }
  }
}
