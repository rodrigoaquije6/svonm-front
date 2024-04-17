import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Trabajador } from 'src/app/models/trabajador';
import { TrabajadorService } from 'src/app/services/trabajador.service';

@Component({
  selector: 'app-crear-trabajador',
  templateUrl: './crear-trabajador.component.html',
  styleUrls: ['./crear-trabajador.component.css']
})
export class CrearTrabajadorComponent implements OnInit {
  trabajadorForm: FormGroup;

  titulo = 'Crear Trabajador'

  id: string | null;

  rol: any[] = [];

  url = 'http://localhost:4000/api/rol/' //https://fuzzy-space-bassoon-5wv69qr7jx7cvr6r-4000.app.github.dev/api/tipoProducto/

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _trabajadorService: TrabajadorService,
    private aRouter: ActivatedRoute,
    private http: HttpClient
  ) {
    this.trabajadorForm = this.fb.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      rol: ['', Validators.required],
      estado: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.obtenerRol();
    this.esEditar();
  }

  obtenerRol() {
    this.http.get<any[]>(this.url).subscribe(
      (roles) => {
        this.rol = roles;
      },
      (error) => {
        console.error('Error al obtener los tipos de productos:', error);
      }
    );
  }

  agregarTrabajador() {
    const TRABAJADOR: Trabajador = {
      dni: this.trabajadorForm.get('dni')?.value,
      nombre: this.trabajadorForm.get('nombre')?.value,
      rol: this.trabajadorForm.get('rol')?.value,
      estado: this.trabajadorForm.get('estado')?.value
    }

    if (this.id !== null) {
      //editamos rol
      this._trabajadorService.editarTrabajador(this.id, TRABAJADOR).subscribe(data => {
        this.toastr.info('El trabajador fue actualizado con éxito!', 'Trabajador Actualizado!')
        this.router.navigate(['/dashboard-gerente/trabajador']);
      }, error => {
        console.log(error);
        this.trabajadorForm.reset();
      })
    } else {
      console.log(TRABAJADOR);
      this._trabajadorService.guardarTrabajador(TRABAJADOR).subscribe(data => {
        this.toastr.success('El trabajador fue registrado con éxito!', 'Trabajador Registrado!');
        this.router.navigate(['/dashboard-gerente/trabajador']);
      }, error => {
        console.log(error);
        this.trabajadorForm.reset();
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Trabajador';
      this._trabajadorService.obtenerTrabajador(this.id).subscribe(data => {
        this.trabajadorForm.setValue({
          dni: data.dni,
          nombre: data.nombre,
          rol: data.rol,
          estado: data.estado
        })
      })
    }
  }

}


