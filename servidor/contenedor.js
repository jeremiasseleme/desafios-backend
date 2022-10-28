const fs = require('fs');

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
        try {
            const productos = await this.getAll();
            let id = productos.length + 1;
            nuevoProducto.id = id;
            productos.push(nuevoProducto);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos));
            return nuevoProducto;
        } catch (e) {
            console.log('Se ha producido un error en save()', e);
        }
    }
    async getById(id) {
        try {
            const productos = await this.getAll();
            const producto = productos.find(p => p.id === id);
            if(producto){
                return producto;
            }else{
                console.log("El ID que ingreso no existe")
            }
        } catch (e) {
            console.log('Se ha producido un error en getById()', e)
        }
    }
    async deleteById(id) {
        try {
            const productos = await this.getAll();
            const productoEncontrado = productos.find((e) => e.id == id);
            if (!productoEncontrado) return console.log("El id que ingreso no existe");
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
}

const cont = new Contenedor("productos.txt")
// cont.save(
//     {nombre: "Monitor Dell 27 pulgadas", 
//     precio: "$60000"}).then((res)=> console.log(res))
// cont.deleteAll();
cont.getAll().then((res)=>console.log(res))
// cont.save({nombre: "Monitor Samsung 27 pulgadas", precio: "$30000"}).then((res) => console.log(res));
// cont.getById(2).then((res)=>console.log(res));
// cont.deleteById(2).then((res)=>console.log(res))
