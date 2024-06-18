export class Montura {
    _id?: number;
    productoId: string;
    color: string;
    genero: string;
    forma: string;

    constructor(productoId: string, color: string, genero: string, forma: string) {
        this.productoId = productoId;
        this.color = color;
        this.genero = genero;
        this.forma = forma;
    }
}