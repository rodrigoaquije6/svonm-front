import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoLuna } from '../models/tipoLuna';

@Injectable({
  providedIn: 'root'
})
export class TipoLunaService {
  url = 'https://probable-space-waddle-v6666v95jxvpfxgq5-4000.app.github.dev/api/tipoLuna/'; //'http://localhost:4000/api/tipoLuna/'

  constructor(private http: HttpClient) { }

  getTipoLunas(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerTipoLuna(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarTipoLuna(id: string): Observable<any>{
    return this.http.delete(this.url + id);

  }

  guardarTipoLuna(tipoLuna: TipoLuna): Observable<any> {
    return this.http.post(this.url, tipoLuna);
  }

  editarTipoLuna(id: string, tipoLuna: TipoLuna): Observable<any> {
    return this.http.put(this.url + id, tipoLuna);
  }

}
