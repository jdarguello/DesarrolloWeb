import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { ComprasComponent } from './compras/compras.component';

import { ProductoComponent } from './producto/producto.component';
import { CarritoComponent } from './carrito/carrito.component';

import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path: '', component: ProductosComponent},
  {path: 'compras', component: ComprasComponent},
  {path: 'compras/producto', component: ProductoComponent},
  {path: 'carrito', component:CarritoComponent},
  {path: 'checkout', component:CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
