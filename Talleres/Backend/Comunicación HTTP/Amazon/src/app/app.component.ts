import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faDolly } from '@fortawesome/free-solid-svg-icons';

import { Router } from '@angular/router';

//OnInit => se trata de una interfaz de Angular que permite especificar las actividades iniciales cuando se accede a un componente.
//          se asemeja al constructor de una clase.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //Atributos de la clase AppComponent. Para acceder al atributo desde el método utilizamos el operador 'this'
  title = 'AmazonTaller';
  usuario = "Andrés";     
  lugar = "Bogotá";
  zip = "680001";

  categorias = [
    "Todos",
    "Automóvil",
    "Bebé",
    "Ropa"
  ];

  articulos:Array<any> = [];
  total:number = 0;

  iconoBusqueda = faSearch;
  iconoCarrito = faDolly;

  numArt:number = 0;

  //Métodos
  constructor(public router:Router) {
    //Inicializa un objeto -> el desarrollo lo aplica una sola vez
    console.log("Aló");
  }

  ngOnInit():void {
    //Inicializar el entorno del componente cada vez que accede a él. Se aplica cada vez que accede al componente
    

    //Almacenar la información general en el navegador del usuario
    //Sólo podemos almacenar información como texto
    localStorage.setItem("usuario", this.usuario);
    localStorage.setItem("lugar", this.lugar);
    localStorage.setItem("categorias", JSON.stringify(this.categorias));
  }



}
