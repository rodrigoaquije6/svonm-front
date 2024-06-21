import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingreso } from '../models/ingreso';
import { Devolucion } from '../models/devolucion';

@Injectable({
  providedIn: 'root'
})
export class DevolucionService {
  url = 'http://localhost:4000/api/devolucion/'; //'http://localhost:4000/api/devolucion/'

  constructor(private http: HttpClient) { }

  getDevoluciones(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerDevolucion(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarDevolucion(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarDevolucion(devolucion: Devolucion): Observable<any> {
    return this.http.post(this.url, devolucion);
  }

  editarDevolucion(id: string, devolucion: Devolucion): Observable<any> {
    return this.http.put(this.url + id, devolucion);
  }

}