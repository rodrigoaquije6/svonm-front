import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { marca } from 'src/app/models/marca';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrls: ['./crear-marca.component.css']
})
export class CrearMarcaComponent implements OnInit{
marcaForm: FormGroup;

constructor(private fb: FormBuilder,
  private toastr: ToastrService,
  private router: Router,
  private _rolService: RolService)
  this.rolForm = this.fb.group({
    nombre: ['',Validators.required],
  })
}

ngOnInit(): void {
}

agregarMarca(){
  
  const marca:MarcaComponent = {
    nombre:this.rolForm.get('nombre')?.value
  }

  console.log(marca);
  this._rolService.guardarRol(marca).subscribe(data =>{
    this.toastr.success('La marca fue registrada con éxito!','Marca Registrada.');
    this.router.navigate(['/dashboard-gerente/marca']);
  },error =>{
    console.log(error);
    this.rolForm.reset();
  })

}