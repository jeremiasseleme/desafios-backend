const router = require("express").Router();
const Contenedor = require('../contenedor');
const contenedor = new Contenedor("./productos.txt");

router.get("/", async (req, res) => {
    const productos = await contenedor.getAll();
    try{
    if (!productos[0]) {
        res.json("no hay productos");
      }
      res.json(productos);
    } catch (e) {
      res.json({error: e});
    }
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    try{
    let productoEncontrado = await contenedor.getById(id)
    res.json(productoEncontrado);
} catch(e){
    res.json({success: false, error: e})
}
});

router.post("/", async (req, res)=> {
    const body = req.body;
    try{
        const nuevoProducto = await contenedor.save(body);
        res.json({success: true, error: false, nuevoProducto: nuevoProducto})
    }catch(e){
        res.json({success: false, error: e})
    }
})

router.delete("/:id", async (req,res) => {
    const {id} = req.params;
    try{
        const productos = await contenedor.deleteById(id);
        res.json({success: true, error: false});
    }catch(e){
        res.json({success: false, error: e});
    }
})

router.put("/:id", async (req, res) => {
    try{ 
        const id = req.params.id;
        const { nombre, precio } = req.body;
        await contenedor.updateById(id, nombre, precio);
        res.json({success: true, error: false});
    }catch (error){
        res.json({success: false, error: e});
    }
})

module.exports = router

