import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:4000/api/producto/' //http://localhost:4000/api/gestionar-producto/ 

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  getProductosActivos(): Observable<any> {
    return this.http.get(this.url + 'activos');
  }
  obtenerProducto(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto);
  }

  editarProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(this.url + id, producto);
  }

  actualizarEstadoProducto(id: string, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.url}${id}/estado`, { estado: nuevoEstado });
  }

  obtenerProductosPorProveedor(idProveedor: string): Observable<any> {
    return this.http.get(`${this.url}proveedor/${idProveedor}`);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
