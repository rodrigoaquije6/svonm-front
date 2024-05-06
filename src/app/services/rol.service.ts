import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  url = 'http://localhost:4000/api/rol/' //https://shiny-tribble-rqj5r9gj7xwf5x55-4000.app.github.dev/api/rol/

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerRol(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarRol(id: string): Observable<any> {
    return this.http.delete(this.url + id);

  }

  guardarRol(rol: Rol): Observable<any> {
    return this.http.post(this.url, rol);
  }

  editarRol(id: string, rol: Rol): Observable<any> {
    return this.http.put(this.url + id, rol);
  }
}