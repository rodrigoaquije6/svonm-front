import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _rolService: RolService) {
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
    this._rolService.guardarRol(ROL).subscribe(data => {
      this.toastr.success('El rol fue registrado con éxito!', 'Rol Registrado!');
      this.router.navigate(['/dashboard-gerente/rol']);
    }, error =>{
      console.log(error);
      this.rolForm.reset();
    })

  }

}
