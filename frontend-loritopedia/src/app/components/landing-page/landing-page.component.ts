import {Component} from '@angular/core';
import {Parrot} from '../../interfaces/parrot';
import {ParrotService} from '../../services/parrot.service';
import {NgOptimizedImage} from '@angular/common';
import {UserService} from '../../services/user.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  parrots: Parrot[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private _parrotService: ParrotService,
    private _userService: UserService
  ) {
  }

  ngOnInit() {
    this.isLoggedIn = this._userService.getLoggedIn();

    this._parrotService.getAllParrots().subscribe({
      next: (data: any) => {
        this.parrots = data.parrots as Parrot[];
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addNewParrot() {

  }

}
