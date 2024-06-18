import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url = 'https://probable-space-waddle-v6666v95jxvpfxgq5-4000.app.github.dev/api/cliente/'; //'http://localhost:4000/api/cliente/'

  constructor(private http: HttpClient) { }

  getClientes(): Observable<any> {
    return this.http.get(this.url);
  }

  obtenerCliente(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  eliminarCliente(id: string): Observable<any>{
    return this.http.delete(this.url + id);

  }

  guardarCliente(cliente: Cliente): Observable<any> {
    return this.http.post(this.url, cliente);
  }

  editarCliente(id: string, cliente: Cliente): Observable<any> {
    return this.http.put(this.url + id, cliente);
  }

}
