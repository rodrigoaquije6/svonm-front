import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NombreLuna } from '../models/luna';

@Injectable({
  providedIn: 'root'
})
export class TipoLunaService {
  url = 'https://humble-spork-76j9g5xx4pgfpv7v-4000.app.github.dev/api/luna/' //http://localhost:4000/api/luna/

  constructor(private http: HttpClient) { }

  getNombreLuna(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerNombreLuna(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarNombreLuna(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarNombreLuna(luna: NombreLuna): Observable<any> {
    return this.http.post(this.url, luna);
  }
  
  editarNombreLuna(id: string, luna: NombreLuna): Observable<any> {
    return this.http.put(this.url + id, luna);
  }
}
