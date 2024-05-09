import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { GestionarProducto } from 'src/app/models/gestionar-producto';
import { GestionarProductoService } from 'src/app/services/gestionar-producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  gestionarproductoForm: FormGroup;

  titulo = 'Crear producto'

  id: string | null;

  url = 'http://localhost:4000/api/crear-producto/ ' //https://vigilant-acorn-q7777qjxj95jhx77v-4000.app.github.dev/api/crear-producto/

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _gestionarproductoService: GestionarProductoService,
    private aRouter: ActivatedRoute,
    private api: LoginService,) {
    this.gestionarproductoForm = this.fb.group({
      codigo: ['', Validators.required],
      tipoProducto: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarGestionarProducto() {
    const GESTIONARPRODUCTO: GestionarProducto = {
      codigo: this.gestionarproductoForm.get('codigo')?.value,
      tipoProducto: this.gestionarproductoForm.get('tipoProducto')?.value,
      nombre: this.gestionarproductoForm.get('nombre')?.value,
      precio: this.gestionarproductoForm.get('precio')?.value,
      imagen: this.gestionarproductoForm.get('imagen')?.value,
    }

    if (this.id !== null) {
      this._gestionarproductoService.editarGestionarProducto(this.id, GESTIONARPRODUCTO).subscribe(data => {
        this.toastr.info('El producto fue actualizado con éxito!', 'Producto Actualizado!')
        this.router.navigate(['/dashboard-gerente/gestionar-producto']);
      }, error => {
        console.log(error);
        this.gestionarproductoForm.reset();
      })
    } else {
      console.log(GESTIONARPRODUCTO);
      this._gestionarproductoService.guardarGestionarProducto(GESTIONARPRODUCTO).subscribe(data => {
        this.toastr.success('El producto fue registrado con éxito!', 'Producto Registrado!');
        this.router.navigate(['/dashboard-gerente/gestionar-producto']);
      }, error => {
        console.log(error);
        this.gestionarproductoForm.reset();
      })
    }

  }

  agregarMonturaForm() {
    const GESTIONARPRODUCTO: GestionarProducto = {
    codigo: this.gestionarproductoForm.get('codigo')?.value,
    tipoProducto: this.gestionarproductoForm.get('tipoProducto')?.value,
    nombre: this.gestionarproductoForm.get('nombre')?.value,
    precio: this.gestionarproductoForm.get('precio')?.value,
    imagen: this.gestionarproductoForm.get('imagen')?.value,
    }

    if (this.id !== null) {
      this._gestionarproductoService.editarGestionarProducto(this.id, GESTIONARPRODUCTO).subscribe(data => {
        this.toastr.info('El producto fue actualizado con éxito!', 'Producto Actualizado!')
        this.router.navigate(['/dashboard-gerente/gestionar-producto']);
      }, error => {
        console.log(error);
        this.gestionarproductoForm.reset();
      })
    } else {
      console.log(GESTIONARPRODUCTO);
      this._gestionarproductoService.guardarGestionarProducto(GESTIONARPRODUCTO).subscribe(data => {
        this.toastr.success('El producto fue registrado con éxito!', 'Producto Registrado!');
        this.router.navigate(['/dashboard-gerente/gestionar-producto']);
      }, error => {
        console.log(error);
        this.gestionarproductoForm.reset();
      })
    }

  }



  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Producto';
      this._gestionarproductoService.obtenerGestionarProducto(this.id).subscribe(data => {
        this.gestionarproductoForm.setValue({
          codigo: data.codigo,
          tipoProducto: data.tipoProducto,
          nombre: data.nombre,
          precio: data.precio,
          imagen: data.imagen
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