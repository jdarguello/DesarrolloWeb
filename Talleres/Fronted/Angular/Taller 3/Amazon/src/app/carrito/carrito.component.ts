import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(public app:AppComponent, private router:Router) { }

  ngOnInit(): void {
  }

  actualizarItem(art:Map<string, any>, form:NgForm):void {
    //Leer entrada numérica
    const cant:number = form.value.cantidad;

    //Desarrollo
    if (cant <= 0) {
      //Eliminamos el artículo de la lista
      this.eliminarItem(art);
    } else {
      //Adicionamos la cantidad del artículo y actualizamos
      this.eliminarItem(art, false);
      const indice = this.app.articulos.indexOf(art);
      this.app.articulos[indice].set("cantidad", cant);
      this.app.numArt += cant;

      const precio = art.get("precio");
      this.app.total += precio*cant;
    }    

  }

  eliminarItem(art:Map<string, any>, del:boolean = true):void {
    const indice = this.app.articulos.indexOf(art);
    //Actualizar número de artículos
    const numArtAnterior:number = this.app.articulos[indice].get("cantidad");
    this.app.numArt -= numArtAnterior;

    //Actualizar total
    const precio = art.get("precio");
    this.app.total -= precio*numArtAnterior;

    //Eliminar artículo
    if (del) {
      this.app.articulos.splice(indice, 1);
    }
  }

  checkout() {
    if (this.app.numArt > 0) {
      this.router.navigate(["checkout"]);
    }
  }

}
