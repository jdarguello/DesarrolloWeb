import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  infoEnvio:Map<string, string> = new Map<string, string>([
    ["nombre", "Andrés Pérez"],
    ["direccion", "Cll 80 #30"],
    ["lugar", "Bogotá 680001"],
    ["pais", "Colombia"],
    ["contacto", "Teléfono: +573108503125"]
  ]);

  mostrarEdicion:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  edicion() {
    this.mostrarEdicion = false;
  }

}
