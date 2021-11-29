import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  infoProducto:Array<any> = [];
  cantidad:number = 1;

  constructor(private app:AppComponent, private router:Router) { }

  ngOnInit(): void {
    //Apenas accedamos al componente, importamos la información del producto escogido
    this.infoProducto = JSON.parse(localStorage.getItem("producto") || "[]");
  }

  cambioCantidad(evento:any): void {
    //Conversión de texto a número => parseInt
    //event.target.value => Hace referencia al valor de la cantidad 
    //seleccionada por el usuario
    //console.log(evento);
    this.cantidad = parseInt(evento.target.value);
    //console.log("cantidad actual = " + evento.target.value);
  }

  agregarArticulo(): void {
    //Almacenar la información del artículo en nuestro 
    //array de artículos

    /*
      this.infoProducto = [
        ["imagen", "..."],  //0
        ["precio", 500000], //1
        ["descripción", "la mejor silla del mundo"], //2
        ["Marca", "HC Muebles"]
      ]
    */

    this.infoProducto.push(["cantidad", this.cantidad])
    this.app.articulos.push(this.infoProducto);

    //Actualizar cantidad de artículos
    this.app.numArt += this.cantidad;

    //Actualizar total de la compra
    //total += cantidad*PrecioUnitario

    this.app.total += this.cantidad*parseInt(this.infoProducto[1][1][1]);

    //Cambio a la página principal
    this.router.navigate(["/"]);
  }

}
