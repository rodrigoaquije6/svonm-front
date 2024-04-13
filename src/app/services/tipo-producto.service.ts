import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoProducto } from '../models/tipoProducto';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  url = 'https://fuzzy-space-bassoon-5wv69qr7jx7cvr6r-4000.app.github.dev/api/tipoProducto/' //http://localhost:4000/api/tipoProducto/

  constructor(private http: HttpClient) { }

  getTipoProducto(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarTipoProducto(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarTipoProducto(tipoProducto: TipoProducto): Observable<any> {
    return this.http.post(this.url, tipoProducto);
  }
}
