import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Almacen } from '../models/almacen';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  url = 'http://localhost:4000/api/almacen/' //https://shiny-tribble-rqj5r9gj7xwf5x55-4000.app.github.dev/api/luna/

  constructor(private http: HttpClient) { }

  getAlmacen(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerAlmacen(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarLuna(id: string, almacen: Almacen): Observable<any> {
    return this.http.put(this.url + id, almacen);
  }
}
