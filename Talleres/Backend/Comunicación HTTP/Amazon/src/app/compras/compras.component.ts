import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //Router => herramienta que permite hacer cambios de página desde TypeScript

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  //Para poder utilizar la información en el documento HTML, debe ser, si o si, un atributo de la clase
  //NO puede ser una variable dentro de un método
  productos:Array<any> = [];
  categoria:string = "";

  constructor(private router:Router) { }

  ngOnInit(): void {
    //Se utiliza para aplicar una lógica apenas el usuario acceda al componente
    //console.log("Accediste a la sección de compras.");

    //Hacemos la importación de los productos almacenados en el navegador de nuestro usuario
    //localStorage => herramienta que permite almacenar (setItem) y obetener información (getItem) del navegador de nuestro usuario.
    //                A la hora de almacenar, o retribuir información, será en formato de texto (string)
    //console.log("productos del navegador = " + localStorage.getItem("productos"));

    //Conversión de texto en otro tipo de variables => método 'parse' de JSON
    this.productos = JSON.parse(localStorage.getItem("productos") || "[]");

    this.categoria = localStorage.getItem("categoria") || ""; //Por ser un texto, no es necesario convertir el tipo de variable con JSON.parse()
  }

  paginaProducto(prod:Array<any>) {
    //Objetivos: cambiar a la página del producto. Almacenar, en el navegador, la información del producto elegido

    localStorage.setItem("producto", JSON.stringify(prod));

    //console.log(JSON.stringify(prod));

    
    this.router.navigate(["compras/producto"]);
  }
}
