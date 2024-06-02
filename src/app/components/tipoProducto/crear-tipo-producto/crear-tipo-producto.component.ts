import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { TipoProducto } from 'src/app/models/tipoProducto';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';

@Component({
  selector: 'app-crear-tipo-producto',
  templateUrl: './crear-tipo-producto.component.html',
  styleUrls: ['./crear-tipo-producto.component.css']
})
export class CrearTipoProductoComponent implements OnInit {
  tipoProductoForm: FormGroup;

  titulo = 'Crear Tipo de producto';

  id: string | null;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private api: LoginService,
    private _tipoProductoService: TipoProductoService) {
    this.tipoProductoForm = this.fb.group({
      nombre: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarTipoProducto() {

    if (this.tipoProductoForm.invalid) {
      this.toastr.error('Por favor, complete el formulario correctamente.', 'Error');
      return;
    }

    const TIPOPRODUCTO: TipoProducto = {
      nombre: this.tipoProductoForm.get('nombre')?.value
    }

    if (this.id !== null) {
      //editamos rol
      this._tipoProductoService.editarTipoProducto(this.id, TIPOPRODUCTO).subscribe(data => {
        this.toastr.info('El tipo de producto fue actualizado con éxito!', 'Tipo de producto Actualizado!')
        this.router.navigate(['/dashboard-gerente/tipoProducto']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.tipoProductoForm.reset();
        }
        //console.log(error);
        //this.rolForm.reset();
      })
    } else {
      //agregamos tipoP
      console.log(TIPOPRODUCTO);
      this._tipoProductoService.guardarTipoProducto(TIPOPRODUCTO).subscribe(data => {
        this.toastr.success('El tipo de producto fue registrado con éxito!', 'Tipo de producto Registrado!');
        this.router.navigate(['/dashboard-gerente/tipoProducto']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.tipoProductoForm.reset();
        }
        //console.log(error);
        //this.tipoProductoForm.reset();
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar tipo producto';
      this._tipoProductoService.obtenerTipoProducto(this.id).subscribe(data => {
        this.tipoProductoForm.setValue({
          nombre: data.nombre,
        })
      })
    }
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tipoProducto');
    this.router.navigate(['login']);
  }

}
