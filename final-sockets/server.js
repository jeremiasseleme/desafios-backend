//https://socket.io/docs/v4/server-initialization/
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const Contenedor = require('./contenedor');
const contenedor = new Contenedor("./productos.txt");
const ContenedorMsj = require('./contenedor');
const contenedorMsj= new ContenedorMsj("./mensajes.txt");

//IMPLEMENTACION
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

httpServer.listen(PORT, () =>
  console.log("SERVER ON http://localhost:" + PORT)
);
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let msgs = [];
let products = [];

//leer el archivo y cargar los msgs

io.on("connection", (socket) => {
  //console.log("se creo un socket nuevo " + socket.id);
  // socket.emit("msg", "hola front!");
  const fecha = new Date().toUTCString();
  
  socket.on("msg", (data) => {
    console.log("data", data);
    msgs.push({
      socketid: socket.id,
      email: data.email,
      mensaje: data.mensaje,
      fecha: fecha,
    });
    contenedorMsj.save(msgs)
    //persistir en un archivo

    io.sockets.emit("msg-list", msgs);
  });
  /* socket.on("disconnect", (reason) => {
    console.log(reason + " " + socket.id);
  }); */
});

io.on("connection", (socket) => {
  
  socket.on("cargaProd", (data) => {
    console.log("data", data);
    products.push({
      nombre: data.nombre,
      precio: data.precio,
    });
    contenedor.save(products)
    //persistir en un archivo

    io.sockets.emit("cargaProds", products);
  });
});