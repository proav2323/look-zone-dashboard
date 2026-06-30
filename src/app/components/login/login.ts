import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { loginModel } from '../../../models/login';
import { email, form, required, submit } from '@angular/forms/signals';
import { MatIcon } from '@angular/material/icon';
import { Field } from '../field/field';
import { Users } from '../../services/users';
import { Loader } from '../loader/loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Field, Loader],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  loginData: WritableSignal<loginModel> = signal({ email: '', password: '' });
  loginForm = form(this.loginData, (path) => {
    required(path.email, { message: 'please enter your email' });
    email(path.email, { message: 'please enter a valid email' });
    required(path.password, { message: 'please enter your password' });
  });
  usersService = inject(Users);
  router = inject(Router);

  isLoading = computed(() => this.usersService.isLoading());
  constructor() {}

  submit(e: SubmitEvent) {
    e.preventDefault();
    submit(this.loginForm, async () => {
      const cred = this.loginData();
      this.usersService.login(cred.email, cred.password);
    });
  }
}
