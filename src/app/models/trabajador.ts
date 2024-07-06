export class Trabajador {
    _id?: number;
    user_dni: string;
    role: string;
    nombres: string;
    apellidos: string;
    password: string;
    nuevaContrasena?: string; // Asegúrate de que 'nuevaContrasena' sea opcional con '?'
    celular: string;
    fecha_nac: Date;
    email: string;
    estado: string;

    constructor(
        user_dni: string,
        role: string,
        nombres: string,
        apellidos: string,
        password: string,
        celular: string,
        fecha_nac: Date,
        email: string,
        estado: string
    ) {
        this.user_dni = user_dni;
        this.role = role;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.password = password;
        this.celular = celular;
        this.fecha_nac = fecha_nac;
        this.email = email;
        this.estado = estado;
    }
}