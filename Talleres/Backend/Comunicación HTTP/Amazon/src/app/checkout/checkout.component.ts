import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../app.component';


import { IPayPalConfig } from 'ngx-paypal';
import { ICreateOrderRequest } from 'ngx-paypal';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  public payPalConfig ? : IPayPalConfig;
  

  constructor(public app:AppComponent) { }

  ngOnInit(): void {
    this.initConfig();
  }

  
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'AWkjYXwSIPiho5lTwTLhJmgO7unb5HL1tWXrpl2mpcewBKHne3t985h4M19PbRJ-_iq2yT3m8zWTK5Zz', //Client Id => permite identificar nuestra cuenta a PayPal
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: '9.99',
                    },
                }]
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
        }
    };
}

}
