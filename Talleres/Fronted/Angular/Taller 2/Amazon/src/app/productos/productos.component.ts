import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  /*
  categoriasProductos:Map<string, Map<string, any>> = new Map<string, Map<string, any>>([
    ["Flash Furniture", new Map<string, any>([
      ["precios", "$10.72 - $856.00"],
      ["img", "../assets/categorias/Flash Furniture/general.jpg"],
      ["productos", new Map<string, any>([
        ["Mesa", new Map<string, any>([
          ["imagen", "../assets/categorias/Flash Furniture/mesa.png"],
          ["precio", 300000],
          ["descripcion", "La mejor mesa del mundo"],
          ["marca", "HC Muebles"]
        ])],
        ["Mueble", new Map<string, any>([
          ["imagen", "../assets/categorias/Flash Furniture/mueble.jpg"],
          ["precio", 500000],
          ["descripcion", "El mejor mueble del mundo"],
          ["marca", "HC Muebles"]
        ])]
      ])]
    ])],
    ["Greenworks", new Map<string, any>([
      ["precios", "$10.72 - $856.00"],
      ["img", "../assets/categorias/Greenworks/general.jpg"],
      ["productos", new Map<string, any>([
        ["Corta cesped", new Map<string, any>([
          ["imagen", "../assets/categorias/Greenworks/cortacesped.jpg"],
          ["precio", 300000],
          ["descripcion", "La mejor mesa del mundo"],
          ["marca", "HC Muebles"]
        ])],
        ["Tractor", new Map<string, any>([
          ["imagen", "../assets/categorias/Greenworks/tractor.webp"],
          ["precio", 30000000],
          ["descripcion", "El mejor tractor del mundo"],
          ["marca", "HC Muebles"]
        ])]
      ])]
    ])],
    ["Learning Resources", new Map<string, any>([
      ["precios", "$10.72 - $856.00"],
      ["img", "../assets/categorias/Learning Resources/general.jpg"],
      ["productos", new Map<string, any>([
        ["Lego", new Map<string, any>([
          ["imagen", "../assets/categorias/Learning Resources/lego.png"],
          ["precio", 30000000],
          ["descripcion", "El mejor lego del mundo"],
          ["marca", "Lego"]
        ])],
        ["Rompecabezas", new Map<string, any>([
          ["imagen", "../assets/categorias/Learning Resources/rompe.webp"],
          ["precio", 30000],
          ["descripcion", "El mejor rompecabezas del mundo"],
          ["marca", "Lego"]
        ])]
      ])]
    ])]
  ]);
  */

  categoriasProductos:Map<string, Map<string, any>> = new Map<string, Map<string, any>>();  //Mapa vacío

  usuario:string = "";
  opcionesFiltrado:Array<string> = [];

  constructor(private router:Router, private api:HttpService) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem("usuario") || '{}';
    this.opcionesFiltrado = JSON.parse(localStorage.getItem("opciones") || '[]');

    this.obtencionCategorias();
  }

  obtencionCategorias():void {
    this.api.get("productos/api/crud/tipo/")
      .subscribe(
        data => {
          for (let categoria of data) {
            this.categoriasProductos.set(categoria.nombre, new Map<string, any>([
              ["img", categoria.foto],
              ["precios", categoria.rangoPrecios]
            ]));
          }
          console.log(this.categoriasProductos);
        }
      );
  }

  compras(categoria:string):void {
    //Filtrado de información
    const categoriaInfo:Map<string, any> = this.categoriasProductos.get(categoria) || new Map<string, any>();
    const productos:Map<string, any> = categoriaInfo.get("productos");

    //Guardado de información
    localStorage.setItem("productos", JSON.stringify(productos, this.reemplazar));
    localStorage.setItem("categoria", categoria);

    //Cambio de página
    this.router.navigate(['compras']);
  }

  reemplazar(key:string, value:any): any {
    if (value instanceof Map) {
      return Array.from(value);
    }
    return value;
  }

}
