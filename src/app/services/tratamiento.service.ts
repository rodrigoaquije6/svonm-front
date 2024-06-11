import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tratamiento } from '../models/tratamiento';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  url = 'http://localhost:4000/api/tratamiento/'; //'http://localhost:4000/api/tratamiento/'

  constructor(private http: HttpClient) { }

  getTratamientos(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerTratamiento(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarTratamiento(id: string): Observable<any>{
    return this.http.delete(this.url + id);

  }

  guardarTratamiento(tratamiento: Tratamiento): Observable<any> {
    return this.http.post(this.url, tratamiento);
  }

  editarTratamiento(id: string, tratamiento: Tratamiento): Observable<any> {
    return this.http.put(this.url + id, tratamiento);
  }

}
