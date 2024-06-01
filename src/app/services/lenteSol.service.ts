import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LenteSol } from '../models/lenteSol';

@Injectable({
  providedIn: 'root'
})
export class LenteSolService {
  url: string = 'http://localhost:4000/api/lenteSol/'; //'http://localhost:4000/api/lenteSol/'

  constructor(private http: HttpClient) { }

  getLenteSol(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerLenteSol(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarLenteSol(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarLenteSol(lenteSol: LenteSol): Observable<any> {
    return this.http.post(this.url, lenteSol);
  }

  editarLenteSol(id: string, lenteSol: LenteSol): Observable<any> {
    return this.http.put(this.url + id, lenteSol);
  }

}
