import { Injectable } from '@angular/core';
import { LoginI } from '../models/login.interface';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ResponseI } from '../models/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = 'http://localhost:4000/api/'; //'http://localhost:4000/api/'; 

  constructor(private http: HttpClient) { }

  loginByEmail(form: LoginI): Observable<ResponseI> {
    let direccion = this.url + 'login';

    return this.http.post<ResponseI>(direccion, form, { observe: 'response' }).pipe(
      tap((res: any) => {
        const token = res.body.token;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('rol', res.body.role);
          this.getProfile().subscribe(profile => {
            localStorage.setItem('nombres', profile.nombres);
            localStorage.setItem('apellidos', profile.apellidos);
          });
        }
      })
    );
  }

  public isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
  public isAdmin(): boolean {
    return localStorage.getItem('rol') == '1' ? true : false;
  }

  // Método para obtener el perfil del trabajador
  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.url + 'profile', { headers });
  }
}
