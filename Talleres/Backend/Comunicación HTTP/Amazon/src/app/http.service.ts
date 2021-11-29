import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  dominio = "http://localhost:8000/";


  constructor(private http:HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(this.dominio + "productos/api/crud/tipo");
  }

}
