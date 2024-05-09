export class LenteSol {
    _id?: number;
    codigo: number;
    marca: string;
    nombre: string;
    color: string;
    genero: string;
    precio: number;
    forma: string;
    imagen: string;
    tipoProducto: string;
    colorlente: string;
    protuv: string;

    constructor(nombre: string, marca: string, color: string, genero: string, precio: number, forma: string, codigo: number, imagen: string, tipoProducto: string,
                colorlente: string, protuv: string) {
        this.nombre = nombre
        this.marca = marca
        this.color = color
        this.genero = genero
        this.precio = precio
        this.forma = forma
        this.codigo = codigo
        this.imagen = imagen
        this.tipoProducto = tipoProducto
        this.colorlente = colorlente
        this. protuv = protuv
    }
}