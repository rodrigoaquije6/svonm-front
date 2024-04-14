import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  url = 'http://localhost:4000/api/crear-marca/'

  constructor(private http: HttpClient) { }

  getMarcas(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarMarca(id: string): Observable<any>{
    return this.http.delete(this.url + id);

  }

  guardarMarca(marca: Marca): Observable<any> {
    return this.http.post(this.url, marca);
  }


}
