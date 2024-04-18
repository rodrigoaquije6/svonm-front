import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Luna } from '../models/luna';

@Injectable({
  providedIn: 'root'
})
export class LunaService {
  url = 'https://shiny-tribble-rqj5r9gj7xwf5x55-4000.app.github.dev/api/luna/' //http://localhost:4000/api/luna/

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
    return this.http.post(this.url, luna);
  }
  
  editarLuna(id: string, luna: Luna): Observable<any> {
    return this.http.put(this.url + id, luna);
  }
}
