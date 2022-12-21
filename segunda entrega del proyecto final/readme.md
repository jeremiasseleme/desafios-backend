# Primera Entrega Proyecto Final

Desarrollo BackEnd - Comisión 43495.

Profesor: Guillermo Jorge Fergnani

Tutora: Tamara Benitez


## Rutas de Productos

#### Las rutas se pueden probar en Postman con los parámetros indicados.

#### isAdmin esta seteado en true por default en la linea 17 de products.js

##### GET: http://localhost:8080/api/products
Devuelve todo los productos

##### POST: http://localhost:8080/api/products
{"nombre": "", "precio": 0, "descipcion":"","codigo": 0, "img": "", "stock": 0}

Devuelve el producto creado

##### DELETE: http://localhost:8080/api/products/idProducto

Elimina el producto por id

##### PUT: http://localhost:8080/api/products/idProducto

Actualiza o reemplaza un producto por id

## Rutas del Carrito

##### POST: http://localhost:8080/api/carrito

Crea un carrito nuevo con su correspondiente estructura

##### POST: http://localhost:8080/api/carrito/idCarrito/productos

Agrega un producto pasando la id como JSON {"idProducto":12}

##### DELETE: http://localhost:8080/api/carrito/idCarrito

Elimina un carrito por id

##### DELETE: http://localhost:8080/api/carrito/idCarrito/productos/idProducto

Elimina un producto por id, de un carrito especifico por id

##### GET: http://localhost:8080/api/carrito/idCarrito/productos

Devuelve todos los productos de un carrito por id.
