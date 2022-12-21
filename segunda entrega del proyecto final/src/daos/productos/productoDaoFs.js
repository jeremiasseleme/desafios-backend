
import contenedorFs from "../../contenedores/contenedorFs.js";

class productoDaoFs extends contenedorFs {
    constructor() {
        super('src/DB/productos.json')
    }
}

export default productoDaoFs;