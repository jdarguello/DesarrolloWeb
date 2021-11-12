<div align="center">
    <h1>Taller 2</h1>
</div>

## Introducción

En el presente taller, continuaremos con nuestro desarrollo frontend de Amazon. Anteriormente, logramos construir la sección de categorías de producto. A continuación, construiremos la sección de productos en donde el usuario podrá seleccionar los artículos específicos que desea adquirir.

## Problema

Nuestro problema objetivo será replicar el desarrollo frontend de Amazon, en la sección de _"Ofertas del día"_, como se aprecia a continuación.

![](Images/Compra.PNG)

<p align="center"><i>Figura 1.</i> Problema de interés.</p>

Para ello, continuaremos con el desarrollo del taller 1.

## 1. Configuración de rutas

Complementaremos el desarrollo del taller 1 a través de la construcción de distintas páginas (URLs). Para ello, iniciaremos creando el componente de _compras_, ejecutando el siguiente comando en consola: `ng g c compras`. Ahora, especificaremos la ruta para acceder a cualquiera de nuestros componentes: productos o compras.

### 1.1. app-routing.module.ts

Este archivo permite la configuración de las rutas de nuestro proyecto. Originalmente, tiene la siguiente estructura:

```TS
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

En la variable `routes` es donde especificaremos nuestras direcciones. Para ello, iniciamos importando los componentes con los que deseamos trabajar:

```TS
import { ProductosComponent } from './productos/productos.component';
import { ComprasComponent } from './compras/compras.component';
```

Luego, las añadimos a la variable routes, de la siguiente forma:

```TS
const routes: Routes = [
  {path: '', component: ProductosComponent},
  {path: 'compras', component: ComprasComponent}
];
```
La primera línea corresponde a la vista principal de nuestro desarrollo, correspondiente al resultado del primer taller. La segunda hace referencia a parte del desarrollo del presente taller. La dirección `compras/:categoria` hace referencia a la sección de compras, y el valor de la categoría corresponderá a la categoría específica que seleccione el usuario. Este valor de categoría nos servirá para saber el contenido que debemos mostrarle al usuario.

Nuestro archivo  quedará de la siguiente forma:

```TS
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { ComprasComponent } from './compras/compras.component';

const routes: Routes = [
  {path: '', component: ProductosComponent},
  {path: 'compras', component: ComprasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Si deseas mayor información, puedes acceder a la documentación oficial de Angular a través del siguiente [enlace](https://angular.io/tutorial/toh-pt5).

### 1.2. app.component.html

Haremos un ajuste de funcionalidad a la cabecera de nuestro desarrollo, que encontramos en __Amazon/src/app/app.component.html__. La idea es que cuando el usuario haga click en el logo de Amazon, lo dirija al desarrollo del primer taller.

Para ello, emplearemos el argumento de Angular de etiqueta `router-link`, de la siguiente forma:

```HTML
  <a class="navbar-brand" routerLink="/" routerLinkActive="active"></a>
```
Como puedes observar, sólo es agregarle a la etiqueta del logo de amazon (que contiene la clase `navbar-brand`) la extensión del routerLink. 

Ahora, añadiremos las direcciones de nuestro proyecto al final de la presente sección, simplemente añadiendo la siguiente etiqueta:

```HTML
...
<router-outlet></router-outlet>
```

Este ajuste nos permitirá usar las rutas registradas anteriormente.

### 1.3. productos.component.html

Haremos un ajuste en este documento, de tal forma que cuando el usuario desee acceder a una categoría de compra, lo redirija a los artículos de dicha categoría. Para ello, agregaremos el router correspondiente. Originalmente, la sección de categorías de productos estaba construida de la siguiente forma:

```HTML
<div class="categorias-productos grid">
    <div class="categoria-producto" *ngFor="let categoria of categoriasProductos | keyvalue">
        <img class="img-cat" src="{{categoria.value.get('img')}}" alt="">
        <div class="cont-promo">
            <p class="promocion">Black Friday</p>
            <p class="precios">{{categoria.value.get('precios')}}</p>
            <p style="margin-top: -1rem; font-size: 18px;">Ahorra en {{categoria.key}} y más</p>
        </div>
    </div>
</div>
```

Simplemente la reajustaremos para que quede así:

```HTML
<div class="categorias-productos grid">
    <a class="categoria-producto" *ngFor="let categoria of categoriasProductos | keyvalue" routerLink="/compras" routerLinkActive="active">
        <img class="img-cat" src="{{categoria.value.get('img')}}" alt="">
        <div class="cont-promo">
            <p class="promocion">Black Friday</p>
            <p class="precios">{{categoria.value.get('precios')}}</p>
            <p style="margin-top: -1rem; font-size: 18px;">Ahorra en {{categoria.key}} y más</p>
        </div>
    </a>
</div>
```

Ahora, al hacer click sobre alguna de las categorías, nos entrará al archivo `compras.component.html`. Por ejemplo:

![](Images/compras_inicial.PNG)

Fíjate en el resultado de la URL. ¡Corresponde a la sección de compras! Y si haces click sobre el logo de Amazon, volverás al resultado del primer taller.

En este punto, las rutas genéricas iniciales del proyecto ya están listas. 

## 2. Componente de compras

En nuestro componente de _compras_, mostraremos al usuario los artículos correspondientes a la categoría escogida. Si bien, en un desarrollo completo, la información de los productos y categorías se obtienen del desarrollo backend a través de API's, a modo de ilustración y de aprendizaje, obtendremos la información a través un diccionario (mapa) creado manualmente que se conectará con un directorio de carpetas, que contendrá las imágenes de nuestros productos, como se aprecia a continuación:

```
categorias   
└───Flash Furniture
|         general.jpg
|               └───productos
|               |       mueble.jpg
|               |       mesa.png
└───Greenworks
|               └───productos
|               |       cortacesped.jpg
|               |       tractor.webp
└───Learning Resources
|               |       rompe.webp
|               |       lego.png

```

Esta carpeta de _categorias_ la debes ubicar dentro de la carpeta __assets__ y la puedes descargar a través del siguiente [enlace](https://1drv.ms/u/s!ApXJVEmB0N31ky55SG7pUdAu5Hg9?e=56JE3C).

### 2.1. productos.component.ts

Lo primero que haremos será añadir la información de los productos individuales en nuestro diccionario `categoriaProductos`; por lo que ahora será:

```TS
categoriasProductos:Map<string, Map<string, any>> = new Map<string, Map<string, any>>([
  ["Flash Furniture", new Map<string, any>([
    ["precios", "$10.72 - $856.00"],
    ["img", "../assets/categorias/Flash Furniture/general.jpg"],
    ["productos", new Map<string, any>([
      ["Mesa", new Map<string, any>([
        ["imagen", "../assets/categorias/Flash Furniture/mesa.png"],
        ["precio", 300000],
        ["descripcion", "La mejor mesa del mundo"],
        ["marca", "HC Muebles"]
      ])],
      ["Mueble", new Map<string, any>([
        ["imagen", "../assets/categorias/Flash Furniture/mueble.jpg"],
        ["precio", 500000],
        ["descripcion", "El mejor mueble del mundo"],
        ["marca", "HC Muebles"]
      ])]
    ])]
  ])],
  ["Greenworks", new Map<string, any>([
    ["precios", "$10.72 - $856.00"],
    ["img", "../assets/categorias/Greenworks/general.jpg"],
    ["productos", new Map<string, any>([
      ["Corta cesped", new Map<string, any>([
        ["imagen", "../assets/categorias/Greenworks/cortacesped.jpg"],
        ["precio", 300000],
        ["descripcion", "La mejor mesa del mundo"],
        ["marca", "HC Muebles"]
      ])],
      ["Tractor", new Map<string, any>([
        ["imagen", "../assets/categorias/Greenworks/tractor.webp"],
        ["precio", 30000000],
        ["descripcion", "El mejor tractor del mundo"],
        ["marca", "HC Muebles"]
      ])]
    ])]
  ])],
  ["Learning Resources", new Map<string, any>([
    ["precios", "$10.72 - $856.00"],
    ["img", "../assets/categorias/Learning Resources/general.jpg"],
    ["productos", new Map<string, any>([
      ["Lego", new Map<string, any>([
        ["imagen", "../assets/categorias/Learning Resources/lego.png"],
        ["precio", 30000000],
        ["descripcion", "El mejor lego del mundo"],
        ["marca", "Lego"]
      ])],
      ["Rompecabezas", new Map<string, any>([
        ["imagen", "../assets/categorias/Learning Resources/rompe.webp"],
        ["precio", 30000],
        ["descripcion", "El mejor rompecabezas del mundo"],
        ["marca", "Lego"]
      ])]
    ])]
  ])]
]);
```

Lo siguiente que debemos es hacer es _almacenar_ la información de nuestra base de datos en el navegador de nuestros usuarios para optimizar el rendimiento de respuesta de nuestro servicio (en lugar de solicitar, una y otra vez, la información al servidor), y lo haremos de la siguiente forma:

```TS
ngOnInit(): void {
  this.usuario = localStorage.getItem("usuario") || '{}';
  this.opcionesFiltrado = JSON.parse(localStorage.getItem("opciones") || '[]');
}

compras(categoria:string):void {
  //Filtrado de información
  const categoriaInfo:Map<string, any> = this.categoriasProductos.get(categoria) || new Map<string, any>();
  const productos:Map<string, any> = categoriaInfo.get("productos");

  //Guardado de información
  localStorage.setItem("productos", JSON.stringify(productos, this.reemplazar));

  //Cambio de página
  this.router.navigate(['compras']);
}

reemplazar(key:string, value:any): any {
  if (value instanceof Map) {
    return Array.from(value);
  }
  return value;
}
```

Como puedes observar, construimos dos funciones adicionales:

* __compras:__ recibe como argumento el nombre de la categoría. Esto lo usaremos para filtrar la información de los productos de la categoría escogida por nuestros usuarios para, cuando llegue a la página de compras, obtenga el resultado que desea.
* __reemplazar:__ se emplea para labores de ajuste de nuestro diccionario (mapa) para guardarlo en el navegador de nuestros usuarios.


### 2.3. productos.component.html

Anteriormente, hicimos un ajuste en el documento para permitir el cambio de página. Sin embargo, no queremos sólo _"cambiar la página"_, sino que, antes de ello, almacenar la información de los productos (función de compras en la sección 2.2). Por lo tanto, haremos un ajuste que permita que cuando el usuario haga click sobre la categoría nos ejecute la función compras.

```HTML
<img class="promo" src="https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2021/img/Events/Holiday/EarlyBlackFriday/LandingPage/BFCM21_Phase2_EBF_hero_banner_short_desktop_1500x150_es.gif" alt="Primeras Ofertas de Black friday">

<div class="contenido-categorias">
    <div class="categorias-genericas">
        <p><b>Departamentos</b></p>
        <div class="categoria" *ngFor="let opcion of opcionesFiltrado;">
            <p><input type="checkbox"> {{opcion}}</p>
        </div>
    </div>
    <div class="categorias-productos grid">
        <a class="categoria-producto" *ngFor="let categoria of categoriasProductos | keyvalue" (click)= "compras(categoria.key)">
            <img class="img-cat" src="{{categoria.value.get('img')}}" alt="">
            <div class="cont-promo">
                <p class="promocion">Black Friday</p>
                <p class="precios">{{categoria.value.get('precios')}}</p>
                <p style="margin-top: -1rem; font-size: 18px;">Ahorra en {{categoria.key}} y más</p>
            </div>
        </a>
    </div>
</div>
```

### 2.4. compras.component.ts

Ahora, construiremos la lógica de nuestro desarrollo. Lo primero que debemos hacer es importar la información de nuestros productos:

```TS
productos:Map<string, Map<string, any>> = new Map<string, Map<string, any>>();

constructor() { }

ngOnInit(): void {
  //Lectura de información general y transformación de datos
  var infoProductos:Array<any> = JSON.parse(localStorage.getItem("productos") || '[]', this.convertidor || '[]');

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
```

Nuevamente, tenemos dos funciones adicionales:

* __convertidor:__ se emplea para convertir la información obtenida de los productos en un array legible por el sistema.

* __traductor:__ convierte el array obtenido en un diccionario para facilitar el procesamiento de la información.

### 2.5. compras.component.html

Ahora, teniendo la inforamción, construiremos la organización de nuestro desarrollo.


