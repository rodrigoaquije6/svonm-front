import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catalogo } from '../models/catalogo';


@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  url = 'https://probable-space-waddle-v6666v95jxvpfxgq5-4000.app.github.dev/api/catalogo/' 

  constructor(private http: HttpClient) { }

  getCatalogo(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerProducto(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  guardarCatalogo(catalogo: Catalogo): Observable<any> {
    return this.http.post(this.url, catalogo);
  }

  editarEstado(id: string, catalogo: Catalogo): Observable<any> {
    return this.http.put(this.url + id, catalogo);
  }
}