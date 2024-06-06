export class Luna {
    _id?: number;
    material: string;
    precio: number;

    constructor(material: string, precio: number) {
        this.material = material;
        this.precio = precio;
    }
}

export class NombreLuna {
    _id?: number;
    tipoluna: string;
    preciodeluna: number;

    constructor(tipoluna: string, preciodeluna: number) {
        this.tipoluna = tipoluna;
        this.preciodeluna = preciodeluna;
    }
}