import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url: string = 'https://bug-free-telegram-wwv6475qj9536rj-4000.app.github.dev/api/producto/'; //'http://localhost:4000/api/montura/'

  constructor(private http: HttpClient) { }

  getProducto(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerProducto(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarProducto(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto);
  }

  editarProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(this.url + id, producto);
  }

}