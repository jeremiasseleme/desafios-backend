import contenedorFirebase from "../../contenedores/contenedorFirebase";

class productoDaoFirebase extends contenedorFirebase {
    constructor() {
        super('src/DB/productos.json')
    }
}

export default productoDaoFirebase;