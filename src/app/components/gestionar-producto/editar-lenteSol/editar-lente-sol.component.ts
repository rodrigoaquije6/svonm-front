import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { LenteSolService } from 'src/app/services/lenteSol.service';
import { LenteSol } from 'src/app/models/lenteSol';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-lente-sol',
  templateUrl: './editar-lente-sol.component.html',
  styleUrls: ['./editar-lente-sol.component.css']
})
export class EditarLenteSolComponent implements OnInit {

  lenteSolForm: FormGroup;

  producto: string | null = "null";

  id: string | null;

  marca: any[] = [];

  url = 'https://bug-free-telegram-wwv6475qj9536rj-4000.app.github.dev/api/crear-marca/'; //http://localhost:4000/api/rol/

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _lenteSolService: LenteSolService,
    private aRouter: ActivatedRoute,
    private api: LoginService,
    private http: HttpClient) {
    this.lenteSolForm = this.fb.group({
      codigo: ['', Validators.required],
      tipoProducto: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required],
      marca: ['', Validators.required],
      genero: [''],
      color: [''],
      forma: [''],
      colorlente: [''],
      protuv: [''],
    })

    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditar();
    this.obtenerMarca();
  }

  obtenerMarca() {
    this.http.get<any[]>(this.url).subscribe(
      (marcas) => {
        this.marca = marcas;
      },
      (error) => {
        console.error('Error al obtener las marcas de los productos', error);
      }
    );
  }

  onItemChange(producto: string | null) {
        console.log('Producto seleccionado:', producto);
        this.producto = producto;
  }

  agregarLenteSolForm() {

    if (this.lenteSolForm.invalid) {
      this.toastr.error('Por favor, complete el formulario correctamente.', 'Error');
      return;
    }

    const LENTESOL: LenteSol = {
    codigo: this.lenteSolForm.get('codigo')?.value,
    tipoProducto: this.lenteSolForm.get('tipoProducto')?.value,
    nombre: this.lenteSolForm.get('nombre')?.value,
    precio: this.lenteSolForm.get('precio')?.value,
    imagen: this.lenteSolForm.get('imagen')?.value,
    marca: this.lenteSolForm.get('marca')?.value,
    color: this.lenteSolForm.get('color')?.value,
    genero: this.lenteSolForm.get('genero')?.value,
    forma: this.lenteSolForm.get('forma')?.value,
    colorlente: this.lenteSolForm.get('colorlente')?.value,
    protuv: this.lenteSolForm.get('protuv')?.value,
    }

    if (this.id !== null) {
      this._lenteSolService.editarLenteSol(this.id, LENTESOL).subscribe(data => {
        this.toastr.info('El producto fue actualizado con éxito!', 'Producto Actualizado!')
        this.router.navigate(['/dashboard-gerente/gestionar-producto']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.lenteSolForm.reset();
        }
        //console.log(error);
        //this.gestionarproductoForm.reset();
      })
    } else {
      console.log(LENTESOL);
      this._lenteSolService.guardarLenteSol(LENTESOL).subscribe(data => {
        this.toastr.success('El producto fue registrado con éxito!', 'Producto Registrado!');
        this.router.navigate(['/dashboard-gerente/gestionar-producto']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.lenteSolForm.reset();
        }
        //console.log(error);
        //this.gestionarproductoForm.reset();
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this._lenteSolService.obtenerLenteSol(this.id).subscribe(data => {
        this.lenteSolForm.setValue({
          codigo: data.codigo,
          tipoProducto: data.tipoProducto,
          nombre: data.nombre,
          precio: data.precio,
          imagen: data.imagen,
          marca: data.marca,
          color: data.color,
          genero: data.genero,
          forma: data.forma,
          colorlente: data.colorlente,
          protuv: data.protuv,
        })
      })
    }
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}