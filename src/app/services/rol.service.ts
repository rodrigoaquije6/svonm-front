import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  url = 'http://localhost:4000/api/rol/'; //'http://localhost:4000/api/rol/'
  
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
    let direccion = this.url + 'crear-rol';
    return this.http.post(direccion, rol);
  }

  editarRol(id: string, rol: Rol): Observable<any> {
    let direccion = this.url + 'editar-rol';
    return this.http.put(direccion + id, rol);
  }
}