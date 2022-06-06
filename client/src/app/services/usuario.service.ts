import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';//MODIFICADO
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API_URL = 'http://localhost:1000/'
  constructor(private http: HttpClient) { }
  getSerivicio() {
    return this.http.get(`${this.API_URL}`)
  }
}
