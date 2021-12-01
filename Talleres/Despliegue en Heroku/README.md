<h1 align="center">Despliegue en Heroku</h1>

## Introducción

Tenemos listo nuestro desarrollo para llevarlo a producción y que pueda ser utilizado por nuestros usuarios. En este punto, debemos escoger un proveedor del servicio de servidor. Para este caso, emplearemos Heroku para hacer el despliegue del servicio.

Lo primero que debemos hacer es crear una cuenta en Heroku, en su sitio oficial.

## 1. Entorno virtual

Un _entorno virtual_ simula el comportamiento de un servidor (computador) que se encuentre completamente "nuevo". Es decir, que no tenga ninguna configuración preestablecida. Se emplean para garantizar la funcionalidad del desarrollo en el servidor. Para crear un entorno virtual en Python, debemos instalar, primero, la siguiente librería: `python -m pip install virtualenv`.

Ahora, creamos un entorno virtual en nuestro proyecto django a través del comando `virtualenv env`. Accederemos al entorno virtual, desde la consola, de la siguiente forma:

```
WINDOWS

.\env\Scripts\activate
```

```
MAC - LINUX

./env/bin/activate
```

### 1.1. Instalación de librerías

Ahora, instalaremos todas las librerías requeridas para que nuestro proyecto corra. Si bien, las librerías a instalar dependen del proyecto, para nuestro caso funcionará la instalación de las siguientes librerías:

```
python -m pip install django==3.0.5 sqlparse==0.2.4 pymongo==3.11.2 djongo==1.3.3 djangorestframework guincorn whitenoise 
```

### 1.2. Archivo requirements.txt

Este archivo es fundamental para el despliegue en el servidor, dado lo usará Heroku para conocer las librerías y paquetes requeridos para el correcto funcionamiento de nuestra aplicación web. Lo generamos a través del siguiente comando: `python -m pip freeze > requirements.txt`


## 2. Configuración 

<h3>2.1. settings.py</h3>

Aplicamos los siguientes ajustes:

```PYTHON
MIDDLEWARE = [
    ...,
    'whitenoise.middleware.WhiteNoiseMiddleware'
]
```

Al final del documento:

```PYTHON
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

<h3>2.2. Procfile</h3>

En la misma dirección donde se encuentra nuestro archivo `manage.py`, crearemos un nuevo archivo que llamaremos `Procfile`. Se trata de un archivo de configuración de Heroku que contendrá lo siguiente:

```
web: gunicorn <nomProyecto>.wsgi --log-file -
```

El nombre del proyecto corresponde a la carpeta que contiene los archivos de configuración del proyecto. Debe escribirse exactamente igual al nombre de la carpeta.

## 3. Despliegue

Heroku emplea una conexión basada en git. Lo instalamos ejecutando el siguiente comando `npm i heroku` y aplicaremos el siguiente procedimiento:

1. `git add .`
2. `git commit -m "comentario"`
3. Iniciamos sesión en heroku ejecutando `heroku login`.
4. Creamos el proyecto en Heroku: `heroku create <nomProyecto>`
5. `heroku git:remote -a <nomProyecto>`
6. `git push heroku master`

Si no muestra ningún inconveniente o error, podemos acceder a nuestro desarrollo a través del comando `heroku open`.

