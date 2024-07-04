import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  url = 'http://localhost:4000/api/venta/'; //'http://localhost:4000/api/venta/'

  constructor(private http: HttpClient) { }

  getVentas(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerVenta(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarVenta(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarVenta(venta: Venta): Observable<any> {
    return this.http.post(this.url, venta);
  }

  editarVenta(id: string, venta: Venta): Observable<any> {
    return this.http.put(this.url + id, venta);
  }

  actualizarEstadoVenta(id: string, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.url}${id}/estado`, { estado: nuevoEstado });
  }

  descargarContratoPDF(id: string): Observable<Blob> {
    return this.http.get(`${this.url}${id}/descargar-contrato`, {
      responseType: 'blob'
    });
  }

  generarCsvVentasDeHoy(): Observable<any> {
    return this.http.get(`${this.url}ventasDeHoy/csv`, {
      responseType: 'text'
    });
  }

  generarCsvVentasDeEsteMes(): Observable<any> {
    return this.http.get(`${this.url}ventasEsteMes/csv`, {
      responseType: 'text'
    });
  }

  generarCsvVentasDeEsteAnio(): Observable<any> {
    return this.http.get(`${this.url}ventasEsteAnio/csv`, {
      responseType: 'text'
    });
  }

  obtenerVentasMesActual(): Observable<any> {
    return this.http.get(`${this.url}mes-actual/total`);
  }

}