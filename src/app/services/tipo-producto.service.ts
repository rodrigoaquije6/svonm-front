import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoProducto } from '../models/tipoProducto';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  url = 'http://localhost:4000/api/tipoProducto/'; //'http://localhost:4000/api/tipoProducto/' //

  constructor(private http: HttpClient) { }

  getTipoProducto(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerTipoProducto(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarTipoProducto(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarTipoProducto(tipoProducto: TipoProducto): Observable<any> {
    let direccion = this.url + 'crear-tipoProducto';
    return this.http.post(direccion, tipoProducto);
  }

  editarTipoProducto(id: string, tipoProducto: TipoProducto): Observable<any> {
    let direccion = this.url + 'editar-tipoProducto';
    return this.http.put(direccion + id, tipoProducto);
  }
}
