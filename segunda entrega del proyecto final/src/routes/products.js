import { Router } from "express"
const Contenedor = require('../contenedor');
const contenedor = new Contenedor("./productos.txt");

const router = Router()

router.get("/", async (req, res) => {
    const productos = await contenedor.getAll();
    try {
        if (!productos[0]) {
            res.json("No hay productos");
        }
        res.json(productos);
    } catch (e) {
        res.json({ error: e });
    }
});

let isAdmin = true;
// let isAdmin = false;

router.post("/", (req,res, next)=>{
    if(isAdmin){
        next();
    }else{
        return res.status(401).json({error: true, description: "Usted no tiene acceso a esta ruta"})
    }
}, async (req, res) => {
    const { body } = req;
    try {
        const nuevoProducto = await contenedor.save(body);
        res.json({ success: true, error: false, nuevoProducto: nuevoProducto })
    } catch (e) {
        res.json({ success: false, error: e })
    }
})

router.delete("/:id", (req,res, next)=>{
    if(isAdmin){
        next();
    }else{
        return res.status(401).json({error: true, description: "Usted no tiene acceso a esta ruta"})
    }
}, async (req, res) => {
    const { id } = req.params;
    try {
        const productos = await contenedor.deleteById(id);
        res.json({ success: true, error: false });
    } catch (e) {
        res.json({ success: false, error: e });
    }
})

router.put("/:id",(req,res, next)=>{
    if(isAdmin){
        next();
    }else{
        return res.status(401).json({error: true, description: "Usted no tiene acceso a esta ruta"})
    }
}, async (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    try {
        await contenedor.updateById(id, nombre, precio);
        res.json({ success: true, error: false });
    } catch (error) {
        res.json({ success: false, error: error });
    }
})

export { router as ProductRouter }

