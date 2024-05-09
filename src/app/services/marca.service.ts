import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  url = 'http://localhost:4000/api/crear-marca/'; //'http://localhost:4000/api/crear-marca/'

  constructor(private http: HttpClient) { }

  getMarcas(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerMarca(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarMarca(id: string): Observable<any>{
    return this.http.delete(this.url + id);

  }

  guardarMarca(marca: Marca): Observable<any> {
    let direccion = this.url + 'crear-marca';
    return this.http.post(direccion, marca);
  }

  editarMarca(id: string, marca: Marca): Observable<any> {
    let direccion = this.url + 'editar-marca';
    return this.http.put(direccion + id, marca);
  }

}
