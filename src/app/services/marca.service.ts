import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  url = 'http://localhost:4000/api/rol/'

  constructor(private http: HttpClient) { }

  getMarcas(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarMarca(codigo: string): Observable<any>{
    return this.http.delete(this.url + codigo);

  }

  guardarMarca(marca: marca): Observable<any> {
    return this.http.post(this.url, marca);
  }
}
