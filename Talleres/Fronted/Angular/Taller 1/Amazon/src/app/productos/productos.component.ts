import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  categoriasProductos:Map<string, Map<string, string>> = new Map<string, Map<string, string>>([
    ["Flash Furniture", new Map<string, string>([
      ["precios", "$10.72 - $856.00"],
      ["img", "../assets/categorias/Flash Furniture/general.jpg"]
    ])],
    ["Greenworks", new Map<string, string>([
      ["precios", "$10.72 - $856.00"],
      ["img", "../assets/categorias/Greenworks/general.jpg"]
    ])],
    ["Learning Resources", new Map<string, string>([
      ["precios", "$10.72 - $856.00"],
      ["img", "../assets/categorias/Learning Resources/general.jpg"]
    ])]
  ]);

  usuario:string = "";
  opcionesFiltrado:Array<string> = [];

  constructor() { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem("usuario") || '{}';
    this.opcionesFiltrado = JSON.parse(localStorage.getItem("opciones") || '[]');
    for (let cat in this.categoriasProductos) {
      console.log(cat);
    }
  }

}
