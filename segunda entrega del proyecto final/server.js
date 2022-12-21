const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const router = require("./routes")
const Contenedor = require('./contenedor');
const contenedor = new Contenedor("./productos.txt");
const path = require("path")
const morgan = require("morgan")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/public', express.static(__dirname + './public'));
app.use("/api", router)
app.use(morgan("dev"))


// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname + "/public/index.html"));
// });

app.post("/", (req, res) => {
    const body = req.body;
    try {
        contenedor.save(body);
        res.json({ success: true, error: false });
    } catch (err) {
        res.json({ error: true, e: err });
    }
});

app.get("/*", (req,res) => {
    res.json({error: true, descripcion: "Ruta no encontrada"})
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});