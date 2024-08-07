import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trabajador } from '../models/trabajador';


@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {
  url = 'http://localhost:4000/api/trabajador/'; //'http://localhost:4000/api/trabajador/'

  constructor(private http: HttpClient) { }

  getTrabajador(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerTrabajador(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarTrabajador(id: string): Observable<any>{
    return this.http.delete(this.url + id);

  }

  guardarTrabajador(trabajador: Trabajador): Observable<any> {
    return this.http.post(this.url, trabajador);
  }

  editarTrabajador(id: string, trabajador: Trabajador): Observable<any> {
    return this.http.put(this.url + id, trabajador);
  }

  actualizarEstadoTrabajador(id: string, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.url}${id}/estado`, { estado: nuevoEstado });
  }

}
