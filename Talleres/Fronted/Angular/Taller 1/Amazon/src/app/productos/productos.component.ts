import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  Object = Object;

  categoriasProductos = {
    "Flash Furniture": {
      "precios": "$10.72 - $856.00",
      "img": "../assets/categorias/Flash Furniture/general.jpg"
    },
    "Learning Resources": {
      "precios": "$6.49 - $223.99",
      "img": "../assets/categorias/Learning Resources/general.jpg"
    },
    "TOPPIN": {
      "precios": "$6.49 - $223.99",
      "img": "../assets/categorias/TOPPIN/general.jpg"
    },
    "Greenworks": {
      "precios": "$6.49 - $223.99",
      "img": "../assets/categorias/Greenworks/general.jpg"
    },
  };
  usuario:string;
  opcionesFiltrado:Array<string>;

  constructor() { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem("usuario");
    this.opcionesFiltrado = JSON.parse(localStorage.getItem("opciones"));
    for (let cat in this.categoriasProductos) {
      console.log(cat);
    }
  }

}
