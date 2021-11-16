import { Component, OnInit } from '@angular/core';

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
    this.usuario = localStorage.getItem("usuario") || '{}';
    this.opcionesFiltrado = JSON.parse(localStorage.getItem("opciones") || '[]');
    for (let cat in this.categoriasProductos) {
      console.log(cat);
    }
  }

}
