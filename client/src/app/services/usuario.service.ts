import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';//MODIFICADO
import { txtArea } from 'src/modelos/txtArea'//MODELO QUE LE ENVIO modelos/txtArea

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API_URL = 'http://localhost:1000/'//LOCAL DEL SERVER
  constructor(private http: HttpClient) { }
  getSerivicio() {
  }
  getSaludoService(){
    return this.http.get(`${this.API_URL}HI`)//->index.ts server
  }
  //TEST
  getdataService() {
    return this.http.get(`${this.API_URL}TEST/GetIncrementoExpress`);
  }
  setTxtAreaService(txt: txtArea) {
    return this.http.post(`${this.API_URL}TEST/SetTxtAreaExpress`, txt);//URL EN SERVER->SRC|tescomponente
  }
  getTxtAreaSaludoService(){
    return this.http.get(`${this.API_URL}TEST/GetTxtAreaSaludoExpress`);
  }
}
  