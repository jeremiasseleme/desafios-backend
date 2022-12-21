import { Router } from "express"
import instancia from './src/daos/index.js';
const carrito = new instancia.carrito;
const producto = new instancia.producto;

const router = Router()

router.post("/", async (req,res) =>{
    const cart = {timestamp: Date.now(), productos: []};
    try{
        await carrito.save(cart);
        res.json({success: true, error: false, mensaje: "Se guardo correctamente"})
    } catch (e) {
        res.json({success: false, error: e})
    }
})

router.post("/:id/productos", async (req,res) => {
    const {id} = req.params;
    const {idProducto} = req.body;
    try{
        const producto = await producto.getById(idProducto)
        carrito.addProductToCart(id,producto)
        res.json({success:true, error: false})
    } catch (e){
        res.json({success: false, error: e})
    }
})

router.delete("/:id", async (req,res) => {
    const {id} = req.params;
    try{
        carrito.clearCart(id);
        res.json({success: true, error: false})
    } catch (e){
        res.json({error:true, success: false})
    }
})

router.delete("/:id/productos/:id_prod", async (req,res) => {
    const {id, id_prod} = req.params;
    try{
        await carrito.deleteProductFromCart(id,id_prod)
        res.json({success: true, error: false})
    } catch (e){
        res.json({error: true, success: false})
    }
})

router.get("/:id/productos", async (req,res) => {
    const {id} = req.params
    try{
        const productos = await carrito.getProductsFromCart(id)
        res.json({success:true, productos: productos})
    } catch (e) {
        res.json({error: true, success: false})
    }
})

export { router as CartRouter };
