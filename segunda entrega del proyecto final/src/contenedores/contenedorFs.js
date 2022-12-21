const fs = require('fs');
let id
class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            const productos = JSON.parse(data);
            return productos;
        }
        catch (e) {
            console.log('Se ha producido un error en getAll()', e);
        }
    }

    async save(nuevoProducto) {
        const productos = await this.getAll();
        let timestamp = Date.now();
        try {
            id = productos.length + 10;
            productos.push({ ...nuevoProducto, id, timestamp});
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, 2));
            return nuevoProducto;
        } catch (e) {
            console.log('Se ha producido un error en save()', e);
        }
    }
    async getById(id) {
        try {
            const productos = await this.getAll();
            const producto = productos.find(p => p.id == id);
            if (producto) {
                return producto;
            } else {
                console.log("El ID que ingreso no existe")
            }
        } catch (e) {
            console.log('Se ha producido un error en getById()', e)
        }
    }
    async deleteById(id) {
        try {
            const productos = await this.getAll();
            const productosFiltrados = productos.filter((e) => e.id != id);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productosFiltrados, null));
        } catch (e) {
            console.log('Se ha producido un error en deleteById()', e);
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]))
        } catch (e) {
            console.log('Se ha producido un error en deleteAll()', e)
        }
    }
    async updateById(id, nombre, precio, descripcion, codigo, img, stock) {
        const productos = await this.getAll();
        const item = productos.find((prod) => prod.id == id);
        item.nombre = nombre;
        item.precio = precio;
        item.descripcion = descripcion;
        item.codigo = codigo;
        item.img = img;
        item.stock = stock;
        console.log(item);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, 2));
        return item;
    };

    async addProductToCart(id, producto) {
        const carritos = await this.getAll();
        const cart = carritos.find((cart) => cart.id == id);
        try {
            cart.productos.push(producto);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(carritos, null, 2))
        } catch (err) {
            console.log(err)
        }
    }

    async clearCart(id) {
        const carritos = await this.getAll();
        const cart = carritos.find((cart) => cart.id == id);
        try {
            cart.productos = []
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(carritos, null, 2))
        } catch (err) {
            console.log(err)
        }
    }

    async deleteProductFromCart(id, id_prod) {
        const carritos = await this.getAll();
        const cart = carritos.find((cart) => cart.id == id);
        try {
            cart.productos = cart.productos.filter((prod) => prod.id != id_prod)
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(carritos, null, 2))
        } catch (err) {
            console.log(err)
        }
    }
    async getProductsFromCart(id) {
        const carritos = await this.getAll();
        const cart = carritos.find((cart) => cart.id == id);
        return cart.productos;
    }
}





const cont = new Contenedor("productos.txt")

module.exports = Contenedor;
// cont.save(
//     {nombre: "Monitor Dell 27 pulgadas",
//     precio: "$60000"}).then((res)=> console.log(res))
// cont.deleteAll();
// cont.getAll().then((res)=>console.log(res))
// cont.save({nombre: "Monitor Samsung 27 pulgadas", precio: "$30000"}).then((res) => console.log(res));
// cont.getById(2).then((res)=>console.log(res));
// cont.deleteById(2).then((res)=>console.log(res))
