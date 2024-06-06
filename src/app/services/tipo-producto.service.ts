import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoProducto } from '../models/tipoProducto';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  url = 'https://orange-trout-6qxgj5ppjrg2gp5-4000.app.github.dev/api/tipoProducto/'; //'http://localhost:4000/api/tipoProducto/' //

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
    return this.http.post(this.url, tipoProducto);
  }

  editarTipoProducto(id: string, tipoProducto: TipoProducto): Observable<any> {
    return this.http.put(this.url + id, tipoProducto);
  }
}
