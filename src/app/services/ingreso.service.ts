import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingreso } from '../models/ingreso';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
  url = 'http://localhost:4000/api/ingreso/'; //'http://localhost:4000/api/ingreso/'

  constructor(private http: HttpClient) { }

  getIngresos(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerIngreso(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarIngreso(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarIngreso(ingreso: Ingreso): Observable<any> {
    return this.http.post(this.url, ingreso);
  }

  editarIngreso(id: string, ingreso: Ingreso): Observable<any> {
    return this.http.put(this.url + id, ingreso);
  }

  actualizarEstadoIngreso(id: string, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.url}${id}/estado`, { estado: nuevoEstado });
  }

  descargarContratoPDF(id: string): Observable<Blob> {
    return this.http.get(`${this.url}${id}/descargar-contrato`, {
      responseType: 'blob'
    });
  }

}