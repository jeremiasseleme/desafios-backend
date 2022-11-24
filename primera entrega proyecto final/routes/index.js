const router = require("express").Router();

const products = require("./products")
const carrito = require("./carrito")

router.use("/products", products)
router.use("/carrito", carrito)

module.exports = router
