import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environmentDevelopment} from '../../environments/environment.development';
import {Observable} from 'rxjs';
import {Parrot} from '../interfaces/parrot';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ParrotService {
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myApiUrl = `${environmentDevelopment.urlBase}/parrots`;
  }

  getAllParrots(): Observable<Parrot[]> {
    return this.http.get<Parrot[]>(`${this.myApiUrl}/`);
  }

  addNewParrot(parrot: Parrot): Observable<Parrot> {
    return this.http.post<Parrot>(`${this.myApiUrl}/`, parrot, {withCredentials: true});
  }
}
