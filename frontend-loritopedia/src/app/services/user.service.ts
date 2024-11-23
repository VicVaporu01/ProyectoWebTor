import {Injectable} from '@angular/core';
import {environmentDevelopment} from '../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {User} from '../interfaces/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myApiUrl: string;
  private isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
    this.myApiUrl = `${environmentDevelopment.urlBase}/users`;
  }

  login(user: User): Observable<any> {
    return this.http.post<string>(`${this.myApiUrl}/login`, user, {withCredentials: true});
  }

  register(user: User): Observable<any>{
    return this.http.post<string>(`${this.myApiUrl}/register`, user, {withCredentials: true});
  }

  logout(): Observable<any> {
    return this.http.get<string>(`${this.myApiUrl}/logout`, {withCredentials: true});
  }

  setLoggedIn(state: boolean) {
    this.isLoggedIn = state;
  }

  getLoggedIn() {
    return this.isLoggedIn;
  }
}
