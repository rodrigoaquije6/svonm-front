import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Almacen } from '../models/almacen';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  url = 'https://bug-free-telegram-wwv6475qj9536rj-4000.app.github.dev/api/almacen/'; //'http://localhost:4000/api/Almacen/' 

  constructor(private http: HttpClient) { }

  getAlmacen(): Observable<any> {
    return this.http.get(this.url);
  }

  editarStock(id:string,Almacen: Almacen): Observable<any> {
    return this.http.put(this.url+id, Almacen);
  }
}