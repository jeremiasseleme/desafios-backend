const router = require("express").Router();
const Contenedor = require('../contenedor');
const contenedor = new Contenedor("./carrito.txt");
const contenedorP = new Contenedor("./productos.txt")

router.post("/", async (req,res) =>{
    const cart = {timestamp: Date.now(), productos: []};
    try{
        await contenedor.save(cart);
        res.json({success: true, error: false, mensaje: "Se guardo correctamente"})
    } catch (e) {
        res.json({success: false, error: e})
    }
})

router.post("/:id/productos", async (req,res) => {
    const {id} = req.params;
    const {idProducto} = req.body;
    try{
        const producto = await contenedorP.getById(idProducto)
        contenedor.addProductToCart(id,producto)
        res.json({success:true, error: false})
    } catch (e){
        res.json({success: false, error: e})
    }
})

router.delete("/:id", async (req,res) => {
    const {id} = req.params;
    try{
        contenedor.clearCart(id);
        res.json({success: true, error: false})
    } catch (e){
        res.json({error:true, success: false})
    }
})

router.delete("/:id/productos/:id_prod", async (req,res) => {
    const {id, id_prod} = req.params;
    try{
        await contenedor.deleteProductFromCart(id,id_prod)
        res.json({success: true, error: false})
    } catch (e){
        res.json({error: true, success: false})
    }
})

router.get("/:id/productos", async (req,res) => {
    const {id} = req.params
    try{
        const productos = await contenedor.getProductsFromCart(id)
        res.json({success:true, productos: productos})
    } catch (e) {
        res.json({error: true, success: false})
    }
})

module.exports = router