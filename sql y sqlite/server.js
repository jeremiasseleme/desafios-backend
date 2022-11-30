
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const Contenedor_mysql = require('./contenedor_mysql');
const Contenedor_sqlite = require("./contenedor_sqlite3")
const contenedor = new Contenedor_mysql("productos");
const contenedorMsj = new Contenedor_sqlite("mensajes");

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


io.on("connection", async (socket) => {

  io.sockets.emit("cargaProds", await contenedor.getAll());

  io.sockets.emit("msg-list", await contenedorMsj.getAll())

  const fecha = new Date().toUTCString();

  socket.on("msg", async (data) => {

    await contenedorMsj.save({ fecha: fecha, ...data });
    io.sockets.emit("msg-list", await contenedorMsj.getAll());

  });

  socket.on("cargaProd", async (data) => {

    await contenedor.save(data)
    io.sockets.emit("cargaProds", await contenedor.getAll());

  });

});
