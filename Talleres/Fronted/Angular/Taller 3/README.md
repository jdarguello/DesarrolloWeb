<div align="center">
    <h1>Taller 3</h1>
</div>

## Introducción

Para finalizar con nuestro desarrollo, construiremos las secciones de _carrito_ y _checkout_ que permitirá la compra de los artículos a través de una cuenta PayPal. Las adiciones que haremos con respecto al taller anterior serán:

1. Resumen del total de artículos contenidos en el carrito de compras.

![](Images/carrito.PNG)

<p align="center"><i>Figura 1.</i> Resumen de artículos de compra en <b>todas</b> las páginas.</p>

2. Página del carrito, donde el usuario podrá eliminar o seleccionar cantidades de artículos.

![](Images/carrito_compra.PNG)

<p align="center"><i>Figura 2.</i> Sección de carrito de compras.</p>

3. Proceder al pago de los artículos en la sección del checkout.

![](Images/checkout.PNG)

<p align="center"><i>Figura 3.</i> Sección de checkout.</p>

## 1. Resumen del carrito

El resumen del carrito busca simplificar las compras del usuario, mostrándole, a través de imágenes, los artículos que está adquiriendo y el valor total de su compra, como se aprecia en la Figura 1.

Como deseamos que el resumen se presente en todas las vistas de nuestro desarrollo, deberemos incluirlo en la __aplicación principal__ y realizar algunos ajustes en otros componentes.

### 1.1. app.component.ts

Empezaremos por crear la variable en donde almacenaremos nuestros productos y el valor total que tendrán. Para ello, crearemos la variable `articulos`, como atributo de la clase `AppComponent`, que será el array en donde almacenaremos la información referente a los artículos de nuestros usuarios.

```TS
articulos:Array<any> = [];
total:number = 0;
```

### 1.2. producto.component.ts

Ahora que tenemos la variable en dónde almacenar nuestros artículos, crearemos la función que permita añadir los artículos, actualizar el número y recalcular el total de compra. Lo primero que debemos hacer es importar la variable `articulos` de la siguiente forma:

```TS
import { AppComponent } from '../app.component';

...

constructor(private router:Router, private app:AppComponent) { }
```

Como puedes apreciar, importamos el `Router` de Angular para permitir el cambio entre páginas e importamos el `AppComponent` para actualizar los atributos de la clase y, con ello, que se actualice la inforamción de forma automática.

Para reconocer la cantidad de artículos a adquirir, seleccionados por el usuario, debemos hacer un pequeño cambio. Primero, crearemos un nuevo atributo de la clase:

```TS
cantidad:number = 1;
```

Lo siguiente que debemos hacer es crear una función que nos reconozca el _evento_ de cambio de cantidad:

```TS
valorCantidad(event:any): void {
    this.cantidad = parseInt(event.target.value);
}
```

---

__Programación orientada a eventos:__

Un evento se conoce como la ocurrencia de _"un cambio"_. En este caso particular, queremos hacer seguimiento de un cambio de selección de cantidad.

---

Ahora que tenemos cómo actualizar la cantidad de artículos, crearemos la función `vistaPrincipal` de la siguiente forma:

```TS
vistaPrincipal() {
    //Cantidad del artículo
    this.producto.set("cantidad", this.cantidad);

    //Añadimos el artículo y actualizamos número de artículos y total
    this.app.articulos.push(this.producto);
    this.app.numArt = this.app.numArt +  this.cantidad;
    this.app.total += this.cantidad*this.producto.get("precio");

    //Cambio de página
    this.router.navigate(["/"]);
  }
```

### 1.3. producto.component.html

Ahora, añadimos la funcionalidad de la función `vistaPrincipal` al hacer click sobre el botón __"Agregar al carrito"__ de la siguiente forma.

```HTML
<button style="background-color: gold;" (click)="vistaPrincipal()">Agregar al carrito</button>
```

Adicional, añadiremos la función que permite actualizar el valor de la cantidad:

```HTML
<select  (change) = "valorCantidad($event)">
```

### 1.4. app.component.html

Adaptaremos la vista del navegador de nuestro de desarrollo para que, además, muestre el resumen de compras siempre y cuando la cantidad de artículos adquiridos sea mayor que cero, además de brindar un estilo tipo _malla_ que permita categorizar la pantalla. El documento HTML quedará de la siguiente forma:

```HTML
<div class="malla" [class.malla] = "numArt > 0">
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" routerLink="/" routerLinkActive="active"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">
              Enviar a {{usuario}}
              <br>
              <b>{{lugar}} {{zip}}</b>
            </a>
          </li>
          <form class="form-inline menu-busqueda">
            <select>
              <option *ngFor="let tipo of categorias;" value="{{tipo}}">{{tipo}}</option>
            </select>
            <input class="" type="search" aria-label="Search">
            <button class="" type="submit"><fa-icon [icon]="iconoBusqueda" class="fa-lg"></fa-icon></button>
          </form>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Hola {{usuario}}
              <br>
              <b>Cuentas y Listas</b>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Devoluciones
              <br>
              <b>y Pedidos</b>
            </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#"><fa-icon [icon]="iconoCarrito" class="fa-2x"></fa-icon> {{numArt}}</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-outlet></router-outlet>
  </div>

  <div *ngIf="numArt > 0" class="resumen-carrito">
    <p>Subtotal</p>
    <h2>US$ {{total}}</h2>
    <img *ngFor="let prod of articulos | keyvalue" src="{{prod.value.get('imagen')}}" alt="">
  </div>

</div>
```

---

__Clases dinámicas:__

```HTML
<div class="malla" [class.malla] = "numArt > 0">
```

Podemos especificar las clases dinámicas en Angular. En este caso particular, especificamos que adopte un comportamiento de malla si el número de artículos es superior a cero. La sintaxis seguida es: `[class.<nombre_clase>] = "condición"`.

__Condicionales:__

```HTML
<div *ngIf="numArt > 0" class="resumen-carrito">
```

Especificamos una sección condicional a través del operador `ngIf`. El contenido se mostrará siempre que se cumpla la condición.

---

### 1.5. app.component.css

Ahora, aportaremos los estilos de nuestra actualización:

```CSS
.navbar-brand {
    background-image: url("../assets/wlogo.png");
    width: 9rem;
    padding-bottom: 5rem;
    margin-right: 2.5rem;
    background-size: 100% 100%;
}

.navbar a {
    /* Color de letra para las etiquetas <a></a> que se que pertenezcan al div que contenga la clase navbar */
    color:white;
}

.menu-busqueda {
    width: 500px;
    margin-top: 1rem;
    margin-left: 2.5rem;
}

.menu-busqueda select {
    /* Contiene las opciones de categorías */
    width:15%;
    padding: 0.5rem;
    background-color: rgb(240, 240, 240);
    border: none;
    border-radius: 0.5rem 0 0 0.5rem;
}

.menu-busqueda input {
    /* Zona en donde se escribe la búsqueda */
    width: 75%;
    padding-top: 0.35rem;
    padding-bottom: 0.35rem;
}

.menu-busqueda button {
    /* Botón de búsqueda */
    width: 10%;
    background-color: rgb(255, 193, 112);
    border: none;
    border-radius: 0 0.5rem 0.5rem 0;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
}

.resumen-carrito {
    background-color: white;
    margin-top: 5%;
    margin-left: 5%;
    text-align: center;
    font-size: 14px;
}

.resumen-carrito h2 {
    color:rgb(160, 7, 7);
    font-size: 18px;
    margin-top: -0.5rem;
}

.resumen-carrito img {
    width: 90%;
}

.malla {
    display: grid;
    grid-template-columns: 90% 10%;
}

@media screen and (max-width:600px) {
    .malla {
        grid-template-columns: 100% 0%;
    }
}
```

Obteniendo el siguiente resultado cuando se realiza una compra:

![](Images/resumen.PNG)

## 2. Componente carrito

Ahora, construiremos la sección del carrito de compras (Figura 2), en donde el usuario podrá apreciar el resumen de las compras y decidir si desea añadir nuevos artículos o eliminarlos.

Iniciamos creando el nuevo componente de la siguiente forma: `ng g c carrito`

### 2.1. app-routing.module.ts

Iniciaremos añadiendo la ruta del carrito de compras de la siguiente forma:

```TS
import { CarritoComponent } from './carrito/carrito.component';

const routes: Routes = [
  ...,
  {path: 'carrito', component:CarritoComponent}
];
```

### 2.2. app.component.ts

Para evaluar la página en la que nos encontramos, simplemente importaremos la clase `Router` y la añadiremos al constructor de la clase `AppComponent` de la siguiente forma:

```TS
import { Router } from '@angular/router';

...

constructor(public route:Router) { }
```

Hacemos la importación de tipo `public` para que podamos acceder al router desde el documento HTML.

### 2.2. app.component.html

Lo siguiente que haremos será habilitar la dirección del carrito cuando el usuario haga click sobre la imagen del carrito.

```HTML
<a class="nav-link" routerLink="/carrito" routerLinkActive="active"><fa-icon [icon]="iconoCarrito" class="fa-2x"></fa-icon> {{numArt}}</a>
```

Al hacer click sobre la imagen carrito, obtendremos el siguiente resultado:

![](Images/carritoWorks.PNG)

Como deseamos que el resumen de compras no nos aparezca en la sección del carrito, modificaremos la condición de la clase de la siguiente forma:

```HTML
<div class="malla" [class.malla] = "numArt > 0 && route.routerState.snapshot.url !== '/carrito' ">
```

También, modificaremos la condición de la sección:

```HTML
<div *ngIf="numArt > 0 && route.routerState.snapshot.url !== '/carrito'" class="resumen-carrito">
```

### 2.3. carrito.component.ts

Ahora, añadiremos las funciones que permitan: añadir nuevos artículos o eliminarlos. Empezamos importando los artículos de la siguiente forma:

```TS
import { AppComponent } from '../app.component';

constructor(public app:AppComponent) { }
```

Añadimos la aplicación principal como pública para poder utilizarla dentro del documento HTML.

Ahora, crearemos las funciones `addItem`, `quitarItem` y `eliminarArt`.

* __addItem:__ añade un artículo adicional.

* __quitarItem:__ remueve un artículo de los ya seleccionados.

* __eliminarArt:__ elimina un artículo.

```TS

```

### 2.4. carrito.component.html


