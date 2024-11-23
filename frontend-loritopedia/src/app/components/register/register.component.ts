import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formUserRegister = new FormGroup({
    'username': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  register() {
    // First validate if the passwords match
    if (this.password?.value !== this.confirmPassword?.value) {
      this.toastr.error("Passwords don't match", 'Error');
      return;
    }

    // Create the new user object
    const newUser = this.formUserRegister.value as User;

    // Call the service to register the user
    this._userService.register(newUser).subscribe({
      next: (data) => {
        this.toastr.success(data.message, 'Success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastr.error("Error creating user", 'Error');
      }
    });
  }

  get username() {
    return this.formUserRegister.get('username');
  }

  get email() {
    return this.formUserRegister.get('email');
  }

  get password() {
    return this.formUserRegister.get('password');
  }

  get confirmPassword() {
    return this.formUserRegister.get('confirmPassword');
  }
}
