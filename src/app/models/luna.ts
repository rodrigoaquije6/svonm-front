export class Luna {
    _id?: number;
    material: string;
    precio: number;

    constructor(material: string, precio: number) {
        this.material = material;
        this.precio = precio;
    }
}