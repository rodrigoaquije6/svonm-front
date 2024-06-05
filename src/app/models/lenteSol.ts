export class LenteSol {
    _id?: number;
    productoId: string;
    genero: string;
    forma: string;
    color: string;
    colorLente: string;
    protuv: string;

    constructor(productoId: string, genero: string, forma: string, color: string, colorLente: string, protuv: string) {
        this.productoId = productoId;
        this.genero = genero;
        this.forma = forma;
        this.color = color;
        this.colorLente = colorLente;
        this.protuv = protuv;
    }
}