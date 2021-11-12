import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faDolly } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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

  iconoBusqueda = faSearch;
  iconoCarrito = faDolly;

  numArt:number = 0;
}
