import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  dominio:string = "http://localhost:8000/";


  constructor(private http:HttpClient) { }

  get(url:string): Observable<any> {
    //GET => petición de usuario para acceso a información
    //url = productos/api/crud/tipo/

    //Observable => esperar a la recepción de la respuesta a la petición de usuario

    return this.http.get(this.dominio + url); //localhost:8000/productos/api/crud/tipo/

  }

}
