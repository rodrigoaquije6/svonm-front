import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GestionarProducto } from '../models/gestionar-producto';


@Injectable({
  providedIn: 'root'
})
export class GestionarProductoService {
  url = 'http://localhost:4000/api/gestionar-producto/' //http://localhost:4000/api/gestionar-producto/ 

  constructor(private http: HttpClient) { }

  getGestionarProducto(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerGestionarProducto(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarGestionarProducto(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarGestionarProducto(gestionarproducto: GestionarProducto): Observable<any> {
    return this.http.post(this.url, gestionarproducto);
  }

  editarGestionarProducto(id: string, gestionarproducto: GestionarProducto): Observable<any> {
    return this.http.put(this.url + id, gestionarproducto);
  }

  getElementById(tipoProducto: string): Observable<any> {
    return this.http.get(this.url + tipoProducto);
  }
}
