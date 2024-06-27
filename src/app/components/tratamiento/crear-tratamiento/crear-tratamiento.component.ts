import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tratamiento } from 'src/app/models/tratamiento';
import { LoginService } from 'src/app/services/login.service';
import { TratamientoService } from 'src/app/services/tratamiento.service';

@Component({
  selector: 'app-crear-tratamiento',
  templateUrl: './crear-tratamiento.component.html',
  styleUrls: ['./crear-tratamiento.component.css']
})
export class CrearTratamientoComponent {
  tratamientoForm: FormGroup;

  titulo = 'Crear Tratamiento'

  id: string | null;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _tratamientoService: TratamientoService,
    private aRouter: ActivatedRoute,
    private api: LoginService,
    private http: HttpClient) {
    this.tratamientoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      estado: ['Activo', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarTratamiento() {

    if (this.tratamientoForm.invalid) {
      this.toastr.error('Por favor, complete el formulario correctamente.', 'Error');
      return;
    }

    const TRATAMIENTO: Tratamiento = {
      nombre: this.tratamientoForm.get('nombre')?.value,
      precio: this.tratamientoForm.get('precio')?.value,
      estado: this.tratamientoForm.get('estado')?.value,
    }

    if (this.id !== null) {
      this._tratamientoService.editarTratamiento(this.id, TRATAMIENTO).subscribe(data => {
        this.toastr.info('El tratamiento fue actualizado con éxito!', 'Tratamiento Actualizado!')
        this.router.navigate(['/dashboard-gerente/tratamiento']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.tratamientoForm.reset();
        }
        //console.log(error);
        //this.trabajadorForm.reset();
      })
    } else {
      console.log(TRATAMIENTO);
      this._tratamientoService.guardarTratamiento(TRATAMIENTO).subscribe(data => {
        this.toastr.success('El tratamiento fue registrado con éxito!', 'Tratamiento Registrado!');
        this.router.navigate(['/dashboard-gerente/tratamiento']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.tratamientoForm.reset();
        }
        //console.log(error);
        //this.trabajadorForm.reset();
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Tipo de Luna';
      this._tratamientoService.obtenerTratamiento(this.id).subscribe(data => {
        this.tratamientoForm.setValue({
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
    localStorage.removeItem('tratamiento');
    this.router.navigate(['login']);
  }
}
