import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';

@Component({
  selector: 'app-crear-rol',
  templateUrl: './crear-rol.component.html',
  styleUrls: ['./crear-rol.component.css']
})
export class CrearRolComponent implements OnInit{
  rolForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router) {
    this.rolForm = this.fb.group({
      nombre: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  agregarRol() {
    console.log(this,this.rolForm)

    const ROL: Rol = {
      nombre: this.rolForm.get('nombre')?.value
    }

    console.log(ROL)
    this.router.navigate(['/dashboard-gerente/rol'])
  }

}
