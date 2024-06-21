import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trabajador } from '../models/trabajador';


@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {
  url = 'https://shiny-space-waddle-jjjjvrg5jjr35p57-4000.app.github.dev/api/'; //'http://localhost:4000/api/trabajador/'

  constructor(private http: HttpClient) { }

  getTrabajador(): Observable<any> {
    return this.http.get(this.url + 'trabajador');
  }

  obtenerTrabajador(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarTrabajador(id: string): Observable<any>{
    return this.http.delete(this.url + id);

  }

  guardarTrabajador(trabajador: Trabajador): Observable<any> {
    let direccion = this.url + 'trabajador';
    return this.http.post(direccion, trabajador);
  }

  editarTrabajador(id: string, trabajador: Trabajador): Observable<any> {
    let direccion = this.url + 'trabajador';
    return this.http.put(direccion + id, trabajador);
  }

}
