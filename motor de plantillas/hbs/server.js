const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const router = require("./routes")
const Contenedor = require('./contenedor');
const contenedor = new Contenedor("./productos.txt");
const path = require("path")
const { engine } = require('express-handlebars');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/public', express.static(__dirname + './public'));
app.use("/api", router)

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);


app.get('/', async (req, res) => {
    const products = await contenedor.getAll()
    res.render('productslist', { products, productsExist: true });
  });
  
  app.get('/form', (req, res) => {
    res.render('form');
  });
  
  
  app.post('/', async (req, res) => {
    const { body } = req;
    try {
      contenedor.save(body);
      res.render('gracias.hbs')
    } catch {
      res.json({ error: true, msj: "No se pudo guardar el producto" });
    }
  });

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});