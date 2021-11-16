import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto:Map<string, any> = new Map<string, any>();
  articulos:Array<any> = [];
  cantidad:number = 1;

  constructor(private router:Router, private app:AppComponent) { }

  ngOnInit(): void {
    //Leer información
    const info:Array<any> = JSON.parse(localStorage.getItem("producto") || "[]");
    this.articulos = JSON.parse(localStorage.getItem("articulos") || "[]");

    //Convertir a mapa
    for (let arg of info) {
      this.producto.set(arg[0], arg[1]);
    }
  }

  valorCantidad(event:any): void {
    this.cantidad = parseInt(event.target.value);
  }

  vistaPrincipal() {
    //Cantidad del artículo
    this.producto.set("cantidad", this.cantidad);

    //Añadimos el artículo y actualizamos número de artículos y total
    this.app.articulos.push(this.producto);
    this.app.numArt = this.app.numArt +  this.cantidad;
    this.app.total += this.cantidad*this.producto.get("precio");

    //Cambio de página
    this.router.navigate(["/"]);
  }

}
