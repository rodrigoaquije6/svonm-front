import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-crear-rol',
  templateUrl: './crear-rol.component.html',
  styleUrls: ['./crear-rol.component.css']
})
export class CrearRolComponent implements OnInit {
  rolForm: FormGroup;

  titulo = 'Crear Rol';

  id: string | null;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private api: LoginService,
    private _rolService: RolService) {
    this.rolForm = this.fb.group({
      nombre: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarRol() {

    if (this.rolForm.invalid) {
      this.toastr.error('Por favor, complete el formulario correctamente.', 'Error');
      return; 
    }

    const ROL: Rol = {
      nombre: this.rolForm.get('nombre')?.value
    }

    if (this.id !== null) {
      //editamos rol
      this._rolService.editarRol(this.id, ROL).subscribe(data => {
        this.toastr.info('El rol fue actualizado con éxito!', 'Rol Actualizado!')
        this.router.navigate(['/dashboard-gerente/rol']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.rolForm.reset();
        }
        //console.log(error);
        //this.rolForm.reset();
      })

    } else {
      //agregamos rol
      console.log(ROL);
      this._rolService.guardarRol(ROL).subscribe(data => {
        this.toastr.success('El rol fue registrado con éxito!', 'Rol Registrado!');
        this.router.navigate(['/dashboard-gerente/rol']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.rolForm.reset();
        }
        //console.log(error);
        //this.rolForm.reset();
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Rol';
      this._rolService.obtenerRol(this.id).subscribe(data => {
        this.rolForm.setValue({
          nombre: data.nombre,
        })
      })
    }
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['login']);
  }
}
