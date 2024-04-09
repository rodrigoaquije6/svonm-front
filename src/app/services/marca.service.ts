import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { crearmarca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class CrearMarcaService {

  url = 'http://localhost:4000/api/rol/'

  constructor(private http: HttpClient) { }

  getMarcas(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarMarca(id: string): Observable<any>{
    return this.http.delete(this.url + id);

  }

  guardarMarca(crearmarca: crearmarca): Observable<any> {
    return this.http.post(this.url, crearmarca);
  }
}
