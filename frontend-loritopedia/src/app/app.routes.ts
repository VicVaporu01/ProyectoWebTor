import {Routes} from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {RegisterParrotComponent} from './components/register-parrot/register-parrot.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'landing-page', pathMatch: 'full'
  },
  {
    path: 'landing-page', component: LandingPageComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'register-parrot', component: RegisterParrotComponent
  },
  {
    path: '**', redirectTo: 'landing-page', pathMatch: 'full'
  }
];
