import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';


@Injectable({
  providedIn: 'root'
})
export class VentaService {
  url = 'https://humble-spork-76j9g5xx4pgfpv7v-4000.app.github.dev/api/venta/' //https://laughing-disco-69999gqpq94w245x6-4000.app.github.dev/api/venta/

  constructor(private http: HttpClient) { }

  getVenta(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerVenta(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarVenta(id: string): Observable<any>{
    return this.http.delete(this.url + id);

  }

  guardarVenta(venta: Venta): Observable<any> {
    return this.http.post(this.url, venta);
  }

  editarVenta(id: string, venta: Venta): Observable<any> {
    return this.http.put(this.url + id, venta);
  }

}
