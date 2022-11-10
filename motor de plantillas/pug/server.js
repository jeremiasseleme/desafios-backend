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

app.set('view engine', 'pug');
app.set('views', './views');


app.get('/hello', (req, res) => {
  res.render('hello.pug');
});

app.get('/', async (req, res) => {
  const products = await contenedor.getAll()
  res.render('products.pug', { products, productsExist: true });
});

app.get('/form', (req, res) => {
  res.render('form.pug');
});

app.post('/', async (req, res) => {
  const { body } = req;
  try {
    contenedor.save(body);
    res.render('gracias.pug')
  } catch {
    res.json({ error: true, msj: "No se pudo guardar el producto" });
  }
});

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});