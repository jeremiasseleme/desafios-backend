const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const Contenedor = require('./contenedor')

app.get("/productos", async (req, res) => {
    const contenedor = new Contenedor("productos.txt");
    const productos = await contenedor.getAll();
    res.json(productos);
});

app.get("/productoRandom", async (req, res) => {
    const contenedor = new Contenedor("productos.txt");
    const productos = await contenedor.getAll();
    let iRandom = productos[Math.ceil(Math.random() * productos.length)];
    res.json(iRandom);
});

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});