import contenedorMemoria from "../../contenedores/contenedorMemoria";

class productoDaoMemoria extends contenedorMemoria {
    constructor() {
        super('src/DB/productos.json')
    }
}

export default productoDaoMemoria;