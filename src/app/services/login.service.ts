import { Injectable } from '@angular/core';
import { LoginI } from '../models/login.interface';
import { Observable } from 'rxjs';
import { ResponseI } from '../models/response.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = 'https://ubiquitous-barnacle-jjjjj5vgvr6qf5949-4000.app.github.dev/api/'; //http://localhost:4000/api/

  constructor(private http: HttpClient) { }

  loginByEmail(form: LoginI): Observable<ResponseI> {
    let direccion = this.url + 'login';

    return this.http.post<ResponseI>(direccion, form, { observe: 'response' });
  }

  public isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
  public isAdmin(): boolean {
    return localStorage.getItem('rol') == '1' ? true : false;
  }

}
