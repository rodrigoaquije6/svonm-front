import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  url = 'https://shiny-space-waddle-jjjjvrg5jjr35p57-4000.app.github.dev/api/rol/' //http://localhost:4000/api/rol/'

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarRol(id: string): Observable<any>{
    return this.http.delete(this.url + id);

  }

  guardarRol(rol: Rol): Observable<any> {
    return this.http.post(this.url, rol);
  }
}