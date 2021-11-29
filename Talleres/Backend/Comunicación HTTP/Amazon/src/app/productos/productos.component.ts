import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  /*Opciones de almacenamiento en el navegador de nuestros usuarios => por lo menos 1000 veces más rápido que solicitando al servidor (0.005 s)
    
    * cookies       => unidades de almacenamiento con la que podemos guardar distintas variables. 4 KB. Funcionan para cualquier navegador web.
                        Cuenta con protocolos de seguridad (encriptamiento). Podemos brindarle un tiempo límite de vida.

    * localStorage => más reciente. Permite almacenar 5 MB por dominio (casi 1000 veces más que las cookies). Es más sencillo de utilizar.
                        No funciona para todos los navegadores.

  */

  categorias:Array<string> = [];

  //Mapa consiste en key-value

  /*categoriaProductos.get("Flash Furniture") == {
    "precios": "10.72 - 856",
    "img": "..",
    "productos": {
      "Mesa": {
        "imagen": "dir",
        "precio":3000,
        "descripcion": "",
        "marca": ""
      },
      "Mueble": {
        ... => misma información de la mesa (mismo formato)
      }
    }
  }
  */

  //Premisa => Ya tenemos la información del backend
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
  
  categoriasProductos:Map<string, Map<string, any>> = new Map<string, Map<string, any>>();

  
  constructor(private router:Router, private app:AppComponent, private api:HttpService) { }   

  ngOnInit(): void {
    //Leemos la información almacenada en el navegador

    //Siempre que usamos el localStorage para obtener información será del tipo 'string|null'. 
    //Significa que el sistema va a intentar obtener la información con la palabra clave dada
    //Pero si no es capaz de obtenerla nos va a dar como respuesta un 'null'

    // || => operador 'or'

    //localStorage.getItem("categorias") || "" == "['Todos', 'Automóvil', ...] OR ''"

    //JSON => convertir estructuras de datos en texto (stringify) y reconvertirlas en la estructura original (parse)

    //JSON -> formato de texto que permite el almacenamiento de estructuras de datos. Es el medio más utilizado de comunicación
    //        entre componentes de software => API's

    //{}

    this.categorias = JSON.parse(localStorage.getItem("categorias") || "[]");

    this.obtenerCategorias();

  }

  obtenerCategorias():void {
    this.api.getProductos()
      .subscribe(
        data =>{
          for (let categoria of data) {
            this.categoriasProductos.set(categoria.nombre, new Map<string, string>([
              ["precios", categoria.rangoPrecios],
              ["img", categoria.foto]
            ]));
          }
        }
      );
  }

  categoriaCompras(categoria:string):void {
    //Objetivo: filtrar la información de la categoría para obtener los productos

    //Filtrado de información
    const infoCategoria:Map<string, any> = this.categoriasProductos.get(categoria) || new Map<string, any>();
    const productos:Map<string, any> = infoCategoria.get("productos") || new Map<string, any>();

    //Almacenar información en el navegador del usuario
    localStorage.setItem("productos", JSON.stringify(productos, this.convertidor));

    //console.log(JSON.stringify(productos, this.convertidor));

    //Problema: al convertir el mapa en texto, nos lo convierte como 
    //          mapa vacío.

    //Solución: debemos convertir el contenido del mapa en un array

    //Almacenar tipo de categoria
    localStorage.setItem("categoria", categoria);

    //CAMBIO DE PÁGINA
    this.router.navigate(["compras"])

  }

  convertidor(key:string, value:any): any {
    //Convertimos contenidos de variables que correspondan a otros mapas
    //los vamos a convertir en arrays. Mientras que el contenido que no
    //sea mapa,lo dejamos como está.
    if (value instanceof Map) {
      return Array.from(value);
    }
    return value;
  }

}
