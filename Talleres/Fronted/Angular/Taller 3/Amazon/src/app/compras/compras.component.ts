import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  productos:Map<string, Map<string, any>> = new Map<string, Map<string, any>>();
  categoria:string = "";

  constructor(private router:Router) { }

  ngOnInit(): void {
    //Lectura de información general y transformación de datos
    var infoProductos:Array<any> = JSON.parse(localStorage.getItem("productos") || '[]', this.convertidor || '[]');
    this.categoria = localStorage.getItem("categoria") || "";

    infoProductos = Object.values(infoProductos);
    this.productos = this.traductor(infoProductos);
  }

  convertidor(key:string, value:any) {
    //Convierte el contenido en un objeto
    if (typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map<string, any>(value.value);
      }
    }
    return value
  }

  traductor(productos:Array<any>): Map<string, Map<string, any>> {
    console.log(productos);
    var res:Map<string, Map<string, any>> = new Map<string, Map<string, any>>();
    for (let producto of productos) {
        res.set(producto[0], new Map<string, any>([
          ["imagen", producto[1][0][1]],
          ["precio", producto[1][1][1]],
          ["descripcion", producto[1][2][1]],
          ["marca", producto[1][3][1]]
        ]))
    }
    return res;
  }

  producto(prod:string):void {
    //Filtrar la información del producto
    var producto:Map<string, any> = this.productos.get(prod) || new Map<string, any>();
    producto.set("nombre", prod);

    //Almacenar información
    localStorage.setItem("producto", JSON.stringify(producto, this.reemplazar));

    //Cambio de página
    this.router.navigate(['compras', 'producto']);
  }

  reemplazar (key:string, value:any): any {
    if (value instanceof Map) {
      return Array.from(value);
    }
    return value;
  }


}
