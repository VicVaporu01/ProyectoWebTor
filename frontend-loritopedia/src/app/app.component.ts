import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {UserService} from './services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-loritopedia';

  constructor(
    private _userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  logout() {
    this._userService.logout().subscribe({
      next: (data) => {
        this.toastr.success(data.message, "Success");
        this._userService.setLoggedIn(false);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastr.error(error.message, "Error");
      }
    });
  }
}
