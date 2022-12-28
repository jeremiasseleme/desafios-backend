const Contenedor_mysql = require('./contenedor_mysql');
const Contenedor_sqlite = require("./contenedor_sqlite3");
const contenedor = new Contenedor_mysql("productos");
const contenedorMsj = new Contenedor_sqlite("mensajes");

contenedor.createTable();

contenedorMsj.createTable();