import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Montura } from '../models/montura';

@Injectable({
  providedIn: 'root'
})
export class MonturaService {
  url = 'https://shiny-space-waddle-jjjjvrg5jjr35p57-4000.app.github.dev/api/'; //'http://localhost:4000/api/montura/'

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
    let direccion = this.url + 'crear-montura';
    return this.http.post(direccion, montura);
  }

  editarMontura(id: string, montura: Montura): Observable<any> {
    let direccion = this.url + 'editar-montura';
    return this.http.put(this.url + id, montura);
  }

}
