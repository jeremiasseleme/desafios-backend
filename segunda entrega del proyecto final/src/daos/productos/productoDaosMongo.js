import contenedorMongo from "../../contenedores/contenedorMongo";
import { productModel } from "../../models/productModel";

class productoDaoMongo extends contenedorMongo {
    constructor() {
        super({
            name: productModel.ProductsCollection,
            schema: productModel.ProductSchema,
          })
    }
}

export default productoDaoMongo;