import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  //Atributos




  //Métodos
  constructor(public app:AppComponent) {
    //Podemos hacer importaciones externas a través del constructor
    /*
      Las importaciones pueden ser de tipo privada o pública
        - private -> sólo pemriten utilizar los métodos, o atributos, dentro de la misma clase
        - public  -> permite utilizar el método o atributo de cualquier 
    */
   }

  ngOnInit(): void {
    //Establecemos la lógica inicial de nuestro desarrollo

    //Deseamos importar la siguiente información:
    /*
      1. Artículos
      2. Total
    */

  }

}
