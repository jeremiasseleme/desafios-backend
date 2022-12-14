const { options } = require("./options/mysql.js")
const knex = require("knex")(options);

class Contenedor {
    constructor(table) {
        this.table = table;
    }

    async createTable() {

        await knex.schema.createTable(this.table, table => {
            table.increments("id")
            table.string("nombre")
            table.integer("precio")
            table.string("descripcion")
            table.string("img")
            table.integer("stock")
            table.string("codigo")
        })
            .then(() => {
                console.log(`Tabla ${this.table} creada`)
            })
            .catch((err) => {
                console.log(err)
                throw err
            })

    }

    async getAll() {
        try {
            const productsList = await knex(this.table).select("*");
            if (productsList.length > 0) {
                return productsList;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async save(nuevoProducto) {

        await knex(this.table)
            .insert(nuevoProducto)
            .then((res) => {
                console.log(`Se cargo el ${this.table}`, res)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    async getById(id) {

        await knex
            .from(this.table).select("*").where("id_producto", id)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
                throw err
            })

    }
    async deleteById(id) {

        await knex
            .from(this.table).where("id_producto", id).del()
            .then((res) => {
                console.log("Se elimino el producto")
            })
            .catch((err) => {
                console.log(err)
                throw err
            })

    }
    async deleteAll() {
        await knex
            .from(this.table).del()
            .then((res) => {
                console.log("Se eliminaron todos los productos")
            })
            .catch((err) => {
                console.log(err)
                throw err
            })

    }
    async updateById(id, precio, descripcion, img, stock) {

        await knex
            .from(this.table).where("id_producto", id).update({ precio: precio, descripcion: descripcion, img: img, stock: stock })
            .then((res) => {
                console.log("Se actualizo el producto")
            })
            .catch((err) => {
                console.log(err)
                throw err
            })

    };

}





const cont = new Contenedor("productos")

module.exports = Contenedor;
// cont.save(
//     {
//         nombre: "Monitor Dell 27 pulgadas",
//         precio: 60000,
//         descripcion: "asdfjk??ajkfldsa",
//         img: "ad??sljdfkajdaf",
//         stock: 5,
//         codigo: 123456,
//     })
// cont.deleteAll();
// cont.getAll().then((res)=>console.log(res))
// cont.save({ nombre: "Monitor Samsung 27 pulgadas", precio: "30000", descripcion: "Monitor 144hz de frecuencia de muestreo, 1ms de respuesta, superslim, sin bordes", img: "asdf", stock: "5", codigo: "789464" }).then((res) => console.log(res));
// cont.getById(1).then((res)=>console.log(res));
// cont.deleteById(3).then((res)=>console.log(res))
// cont.updateById(5, 65000, "144hz de frecuencia de muestreo, 1ms de tiempo de respuesta", "img1", 4)
