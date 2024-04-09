import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _trabajadorService: TrabajadorService) {
    this.trabajadorForm = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      rol: ['', Validators.required],
      estado: ['', Validators.required],
    })
    
  }

  ngOnInit(): void {
  }

  agregarTrabajadores() {

    const TRABAJADOR: Trabajador = {
      dni: this.trabajadorForm.get('dni')?.value,
      nombre: this.trabajadorForm.get('nombre')?.value,
      rol: this.trabajadorForm.get('rol')?.value,
      estado: this.trabajadorForm.get('estado')?.value
    }

    console.log(Trabajador);
    this._trabajadorService.guardarTrabajadores(TRABAJADOR).subscribe(data => {
      this.toastr.success('El trabajador fue registrado con éxito!', 'Trabajador Registrado!');
      this.router.navigate(['/dashboard-gerente/trabajador']);
    }, error =>{
      console.log(error);
      this.trabajadorForm.reset();
    })

  }

}