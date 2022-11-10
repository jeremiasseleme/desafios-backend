const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const router = require("./routes")
const Contenedor = require('./contenedor');
const contenedor = new Contenedor("./productos.txt");
const path = require("path")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/public', express.static(__dirname + './public'));
app.use("/api", router)

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const products = await contenedor.getAll()
  res.render('pages/products', { products });
});

app.post('/', async (req, res) => {
  const { body } = req;
  try {
    contenedor.save(body);
    res.render('pages/gracias');
  } catch {
    res.json({ error: true, msj: "No se pudo guardar el producto" });
  }
});

app.get('/form', (req, res) => {
  res.render('pages/form', { title: 'ingrese un producto nuevo' });
});

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});