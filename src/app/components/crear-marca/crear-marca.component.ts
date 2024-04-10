import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { marca } from 'src/app/models/marca';

@Component({
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrls: ['./crear-marca.component.css']
})
export class CrearMarcaComponent implements OnInit{

  crearmarcaForm: FormGroup;


  constructor(private fb:FormBuilder, private router: Router, private toastr: ToastrService){
    this.crearmarcaForm = this.fb.group({
      codigo:['',Validators.required],
      nombre:['',Validators.required]
    })
  }

ngOnInit(): void {
}

agregarMarca(){


  const CODIGO: marca = {
    codigo:this.crearmarcaForm.get('codigo')?.value,
    nombre: this.crearmarcaForm.get('nombre')?.value

  }
  
  console.log(CODIGO);
  this.toastr.success('La marca fue registrada con éxito!', 'Marca registrada!')
  this.router.navigate(['/dashboard-gerente/marca'])

}

}