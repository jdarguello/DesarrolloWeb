import { Component, OnInit } from '@angular/core';
import { faSearch, faDollyFlatbed } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Amazon';
  usuario = "Juan";
  ubicacion = "Bucaramanga";
  zip = "680003";
  opcionesFiltrado = [
    "Todos",
    "Arte y artesanías",
    "Automotriz"
  ];
  numArt = 0;

  //Íconos
  faSearch = faSearch;
  faCash = faDollyFlatbed;

  constructor() {
   }

  ngOnInit(): void {
    //Almacenamiento de información
    localStorage.setItem("opciones", JSON.stringify(this.opcionesFiltrado));
    localStorage.setItem("numArt", this.numArt.toString());
    localStorage.setItem("usuario", this.usuario);
  }

}
