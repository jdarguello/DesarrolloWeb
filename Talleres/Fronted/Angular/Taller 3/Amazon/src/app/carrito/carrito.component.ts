import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(public app:AppComponent) { }

  ngOnInit(): void {
  }

  addItem(art:Map<string, any>):void {
    const indice = this.app.articulos.indexOf(art);
    this.app.articulos[indice].set("cantidad", this.app.articulos[indice].get("cantidad") + 1);

    this.app.numArt += 1;
  }

}
