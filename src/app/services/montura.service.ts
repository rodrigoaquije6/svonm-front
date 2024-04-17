import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Montura } from '../models/montura';

@Injectable({
  providedIn: 'root'
})
export class MonturaService {
  url = 'http://localhost:4000/api/montura/' //https://shiny-space-rotary-phone-5wv69qr7jrxf6r4-4000.app.github.dev/api/montura/

  constructor(private http: HttpClient) { }

  getMontura(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerMontura(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarMontura(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarMontura(montura: Montura): Observable<any> {
    return this.http.post(this.url, montura);
  }
}
