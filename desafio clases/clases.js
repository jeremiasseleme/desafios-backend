class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = []
        this.mascotas = []
    }
    getFullName() {
        return this.nombre + " " + this.apellido
    }
    addMascota(mascota) {
        this.mascotas.push(mascota)
    }
    countMascotas(){
        return this.mascotas.length()
    }
    addBook(nombre,autor){
        this.libros.push({nombre: nombre, autor: autor})
    }
    getBookNames(){
        this.libros.map((libro) => libro.nombre)
    }
}

