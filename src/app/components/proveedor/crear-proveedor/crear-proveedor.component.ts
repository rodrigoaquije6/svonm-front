import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proveedor } from 'src/app/models/proveedor';
import { LoginService } from 'src/app/services/login.service';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.css']
})
export class CrearProveedorComponent {
  proveedorForm: FormGroup;

  titulo = 'Crear Proveedor'

  id: string | null;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _proveedorService: ProveedorService,
    private aRouter: ActivatedRoute,
    private api: LoginService,
    private http: HttpClient) {
    this.proveedorForm = this.fb.group({
      ruc: ['', Validators.required],
      nombre: ['', Validators.required],
      nombreContacto: ['', Validators.required],
      apellidoContacto: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', Validators.required],
      estado: ['Activo', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProveedor() {

    if (this.proveedorForm.invalid) {
      this.toastr.error('Por favor, complete el formulario correctamente.', 'Error');
      return;
    }

    const PROVEEDOR: Proveedor = {
      ruc: this.proveedorForm.get('ruc')?.value,
      nombre: this.proveedorForm.get('nombre')?.value,
      nombreContacto: this.proveedorForm.get('nombreContacto')?.value,
      apellidoContacto: this.proveedorForm.get('apellidoContacto')?.value,
      telefono: this.proveedorForm.get('telefono')?.value,
      direccion: this.proveedorForm.get('direccion')?.value,
      correo: this.proveedorForm.get('correo')?.value,
      estado: this.proveedorForm.get('estado')?.value,
    }

    if (this.id !== null) {
      this._proveedorService.editarProveedor(this.id, PROVEEDOR).subscribe(data => {
        this.toastr.info('El proveedor fue actualizado con éxito!', 'Proveedor Actualizado!')
        this.router.navigate(['/dashboard-gerente/proveedor']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.proveedorForm.reset();
        }
        //console.log(error);
        //this.trabajadorForm.reset();
      })
    } else {
      console.log(PROVEEDOR);
      this._proveedorService.guardarProveedor(PROVEEDOR).subscribe(data => {
        this.toastr.success('El proveedor fue registrado con éxito!', 'Proveedor Registrado!');
        this.router.navigate(['/dashboard-gerente/proveedor']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.proveedorForm.reset();
        }
        //console.log(error);
        //this.trabajadorForm.reset();
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Proveedor';
      this._proveedorService.obtenerProveedor(this.id).subscribe(data => {
        this.proveedorForm.setValue({
          ruc: data.ruc,
          nombre: data.nombre,
          nombreContacto: data.nombreContacto,
          apellidoContacto: data.apellidoContacto,
          telefono: data.telefono,
          direccion: data.direccion,
          correo: data.correo,
          estado: data.estado,
        })
      })
    }
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('proveedor');
    this.router.navigate(['login']);
  }
}
