import { ObjectId } from "mongodb";

export class Producto {
    _id?: ObjectId;
    código: string;
    tipoP: string;
    nombre: string;
    precio: number;
    imagen: Buffer;

    constructor(código: string, tipoP: string, nombre: string, precio: number, imagen: Buffer, _id?: ObjectId) {
        this._id = _id;
        this.código = código;
        this.tipoP = tipoP,
        this.nombre = nombre,
        this.precio = precio,
        this.imagen = imagen
    }
}

export class Montura extends Producto {
    marca: string;
    color: string;
    género: string;
    forma: string;
    material: string;

    constructor(código: string, tipoP: string, nombre: string, precio: number, imagen: Buffer, marca: string, color: string, género: string,
        forma: string, material: string, _id?: ObjectId) {
        super(código, tipoP, nombre, precio, imagen, _id);
        this.marca = marca;
        this.color = color;
        this.género = género;
        this.forma = forma;
        this.material = material;
    }
}

export class LentesDeSol extends Producto {
    marca: string;
    género: string;
    material: string;
    forma: string;
    color: string;
    colorLente: string;
    proteccionUV: string;

    constructor(código: string, tipoP: string, nombre: string, precio: number, imagen: Buffer, marca: string, género: string, material: string,
        forma: string, color: string, colorLente: string, proteccionUV: string, _id?: ObjectId) {
        super(código, tipoP, nombre, precio, imagen, _id);
        this.marca = marca;
        this.género = género;
        this.material = material;
        this.forma = forma;
        this.color = color;
        this.colorLente = colorLente;
        this.proteccionUV = proteccionUV;
    }
}