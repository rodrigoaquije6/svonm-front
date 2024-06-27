import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoLuna } from 'src/app/models/tipoLuna';
import { LoginService } from 'src/app/services/login.service';
import { TipoLunaService } from 'src/app/services/tipoLuna.service';

@Component({
  selector: 'app-crear-tipo-lunas',
  templateUrl: './crear-tipo-lunas.component.html',
  styleUrls: ['./crear-tipo-lunas.component.css']
})
export class CrearTipoLunasComponent {
  tipoLunaForm: FormGroup;

  titulo = 'Crear Tipo de luna'

  id: string | null;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _tipoLunaService: TipoLunaService,
    private aRouter: ActivatedRoute,
    private api: LoginService,
    private http: HttpClient) {
    this.tipoLunaForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      estado: ['Activo', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarTipoLuna() {

    if (this.tipoLunaForm.invalid) {
      this.toastr.error('Por favor, complete el formulario correctamente.', 'Error');
      return;
    }

    const TIPOLUNA: TipoLuna = {
      nombre: this.tipoLunaForm.get('nombre')?.value,
      precio: this.tipoLunaForm.get('precio')?.value,
      estado: this.tipoLunaForm.get('estado')?.value,
    }

    if (this.id !== null) {
      this._tipoLunaService.editarTipoLuna(this.id, TIPOLUNA).subscribe(data => {
        this.toastr.info('El tipo de luna fue actualizado con éxito!', 'Tipo de Luna Actualizado!')
        this.router.navigate(['/dashboard-gerente/tipoLuna']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.tipoLunaForm.reset();
        }
        //console.log(error);
        //this.trabajadorForm.reset();
      })
    } else {
      console.log(TIPOLUNA);
      this._tipoLunaService.guardarTipoLuna(TIPOLUNA).subscribe(data => {
        this.toastr.success('El tipo de luna fue registrado con éxito!', 'Tipo de Luna Registrado!');
        this.router.navigate(['/dashboard-gerente/tipoLuna']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.tipoLunaForm.reset();
        }
        //console.log(error);
        //this.trabajadorForm.reset();
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Tipo de Luna';
      this._tipoLunaService.obtenerTipoLuna(this.id).subscribe(data => {
        this.tipoLunaForm.setValue({
          nombre: data.nombre,
          precio: data.precio,
          estado: data.estado,
        })
      })
    }
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tipoLuna');
    this.router.navigate(['login']);
  }
}
