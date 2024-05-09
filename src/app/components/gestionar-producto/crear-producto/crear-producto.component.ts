import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { GestionarProducto } from 'src/app/models/gestionar-producto';
import { GestionarProductoService } from 'src/app/services/gestionar-producto.service';
import { MonturaService } from 'src/app/services/montura.service';
import { LenteSolService } from 'src/app/services/lenteSol.service';
import { Montura } from 'src/app/models/montura';
import { LenteSol } from 'src/app/models/lenteSol';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  gestionarproductoForm: FormGroup;

  lenteSolForm: FormGroup;

  producto: string | null = "null";

  titulo = 'Crear producto'  

  id: string | null;

  url = 'https://shiny-space-waddle-jjjjvrg5jjr35p57-4000.app.github.dev/api/'//'http://localhost:4000/api/crear-producto/ ' //https://vigilant-acorn-q7777qjxj95jhx77v-4000.app.github.dev/api/crear-producto/

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _gestionarproductoService: GestionarProductoService,
    private _monturaService: MonturaService,
    private _lenteSolService: LenteSolService,
    private aRouter: ActivatedRoute,
    private api: LoginService,) {
    this.gestionarproductoForm = this.fb.group({
      codigo: ['', Validators.required],
      tipoProducto: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required],
      marca: ['', Validators.required],
      genero: [''],
      color: [''],
      forma: [''],
    })

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
  }

  onItemChange(producto: string | null) {
        console.log('Producto seleccionado:', producto);
        this.producto = producto;
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
    const MONTURA: Montura = {
    codigo: this.gestionarproductoForm.get('codigo')?.value,
    tipoProducto: this.gestionarproductoForm.get('tipoProducto')?.value,
    nombre: this.gestionarproductoForm.get('nombre')?.value,
    precio: this.gestionarproductoForm.get('precio')?.value,
    imagen: this.gestionarproductoForm.get('imagen')?.value,
    marca: this.gestionarproductoForm.get('marca')?.value,
    color: this.gestionarproductoForm.get('color')?.value,
    genero: this.gestionarproductoForm.get('genero')?.value,
    forma: this.gestionarproductoForm.get('forma')?.value,
    }

    if (this.id !== null) {
      this._monturaService.editarMontura(this.id, MONTURA).subscribe(data => {
        this.toastr.info('El producto fue actualizado con éxito!', 'Producto Actualizado!')
        this.router.navigate(['/dashboard-gerente/gestionar-producto']);
      }, error => {
        console.log(error);
        this.gestionarproductoForm.reset();
      })
    } else {
      console.log(MONTURA);
      this._monturaService.guardarMontura(MONTURA).subscribe(data => {
        this.toastr.success('El producto fue registrado con éxito!', 'Producto Registrado!');
        this.router.navigate(['/dashboard-gerente/gestionar-producto']);
      }, error => {
        console.log(error);
        this.gestionarproductoForm.reset();
      })
    }
  }

  agregarLenteSolForm() {
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
        console.log(error);
        this.gestionarproductoForm.reset();
      })
    } else {
      console.log(LENTESOL);
      this._lenteSolService.guardarLenteSol(LENTESOL).subscribe(data => {
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