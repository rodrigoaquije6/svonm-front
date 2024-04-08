import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/models/rol';

@Component({
  selector: 'app-crear-rol',
  templateUrl: './crear-rol.component.html',
  styleUrls: ['./crear-rol.component.css']
})
export class CrearRolComponent implements OnInit{
  rolForm: FormGroup;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router) {
    this.rolForm = this.fb.group({
      nombre: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  agregarRol() {

    const ROL: Rol = {
      nombre: this.rolForm.get('nombre')?.value
    }

    console.log(ROL);
    this.toastr.success('El rol fue registrado con éxito!', 'Rol Registrado!');
    this.router.navigate(['/dashboard-gerente/rol']);
  }

}
