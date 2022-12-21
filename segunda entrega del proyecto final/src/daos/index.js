import ProductosDaoArchivos from "./productos/productoDaoFs.js";
import CarritoDaoArchivos from "./carritos/carritoDaoFs.js";
import { config } from "dotenv";

config();

const instancias = [
    {
        nombre: ProductosDaoArchivos,
        id: 'archivo',
        descripcion: 'producto'
    },
    {
        nombre: CarritoDaoArchivos,
        id: 'archivo',
        descripcion: 'carrito'
    },
]

const instancia = instancias.filter(i => i.id == process.env.INSTANCIA);

const resultado = {
    [instancia[0].descripcion]: instancia[0].nombre,
    [instancia[1].descripcion]: instancia[1].nombre,
}

export default resultado;