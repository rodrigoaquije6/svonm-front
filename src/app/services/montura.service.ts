import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Montura } from '../models/montura';

@Injectable({
  providedIn: 'root'
})
export class MonturaService {
  url = 'http://localhost:4000/api/montura/'

  constructor(private http: HttpClient) { }

  getMontura(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarMontura(id: string): Observable<any>{
    return this.http.delete(this.url + id);

  }

  guardarMontura(montura: Montura): Observable<any> {
    return this.http.post(this.url, montura);
  }
}
