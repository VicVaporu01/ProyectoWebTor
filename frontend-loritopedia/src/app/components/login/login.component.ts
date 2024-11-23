import {Component} from '@angular/core';
import {JsonPipe, NgOptimizedImage} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formUserLogin = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  get email() {
    return this.formUserLogin.get('email');
  }

  get password() {
    return this.formUserLogin.get('password');
  }

  login() {
    const user: User = this.formUserLogin.value as User;

    this._userService.login(user).subscribe({
      next: (data) => {
        this.toastr.success(data.message, 'Success');
        this._userService.setLoggedIn(true);
        this.router.navigate(['/landing-page']);
      },
      error: (error) => {
        this.toastr.error("Incorrect credentials", 'Error');
      }
    });
  }
}
