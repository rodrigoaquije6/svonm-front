import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  url = 'http://localhost:4000/api/crear-marca/' //https://shiny-tribble-rqj5r9gj7xwf5x55-4000.app.github.dev/api/crear-marca/ 

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
    return this.http.post(this.url, marca);
  }

  editarMarca(id: string, marca: Marca): Observable<any> {
    return this.http.put(this.url + id, marca);
  }

}
