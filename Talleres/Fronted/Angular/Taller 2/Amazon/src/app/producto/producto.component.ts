import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto:Map<string, any> = new Map<string, any>();

  constructor() { }

  ngOnInit(): void {
    //Leer información
    const info:Array<any> = JSON.parse(localStorage.getItem("producto") || "[]");

    //Convertir a mapa
    for (let arg of info) {
      this.producto.set(arg[0], arg[1]);
    }
  }

}
