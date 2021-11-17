import { Component, OnInit } from '@angular/core';

import { IPayPalConfig } from 'ngx-paypal';
import { ICreateOrderRequest } from 'ngx-paypal';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  infoEnvio: Map<string, string> = new Map<string, string>([
    ["nombre", "Andrés Pérez"],
    ["direccion", "Cll 80 #30"],
    ["lugar", "Bogotá 680001"],
    ["pais", "Colombia"],
    ["contacto", "Teléfono: +573108503125"]
  ]);

  public payPalConfig?: IPayPalConfig;

  items:any[] = [];

  mostrarEdicion: boolean = true;

  constructor(private app:AppComponent) { }

  ngOnInit(): void {
    this.initConfig();

    //Preparación de items para factura automática:
    for (let art of this.app.articulos) {
      this.items.push({
        name: art.get("nombre"),
          quantity: art.get("cantidad").toString(),
          category: 'DIGITAL_GOODS',
          unit_amount: {
            currency_code: 'USD',
            value: art.get("precio").toString(),
          },
      });
    }
  }

  edicion() {
    this.mostrarEdicion = false;
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AVnXAUk3MNZ7l_aTCmuPzJjqXZE59BqQKLz7i1nKWOgloRA-I2fIzA911CXvzPXPIaWdOVNU6nlztrII',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.app.total.toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.app.total.toString()
              }
            }
          },
          items: this.items
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);


      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

}
