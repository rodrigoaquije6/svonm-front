import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Luna } from '../models/luna';

@Injectable({
  providedIn: 'root'
})
export class LunaService {
  url = 'https://shiny-space-waddle-jjjjvrg5jjr35p57-4000.app.github.dev/api/'; //'http://localhost:4000/api/luna/' 

  constructor(private http: HttpClient) { }

  getLunas(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerLuna(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarLuna(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarLuna(luna: Luna): Observable<any> {
    let direccion = this.url + 'crear-luna';
    return this.http.post(direccion, luna);
  }
  
  editarLuna(id: string, luna: Luna): Observable<any> {
    let direccion = this.url + 'editar-marca/';
    return this.http.put(direccion + id, luna);
  }
}
