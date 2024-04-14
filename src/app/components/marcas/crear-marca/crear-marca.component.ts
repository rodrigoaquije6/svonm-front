import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/models/marca';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrls: ['./crear-marca.component.css']
})
export class CrearMarcaComponent implements OnInit{

  crearmarcaForm: FormGroup;


  constructor(private fb:FormBuilder, private router: Router, private toastr: ToastrService, private _marcaService : MarcaService){
    this.crearmarcaForm = this.fb.group({

      nombre:['',Validators.required]
    })
  }

ngOnInit(): void {
}

agregarMarca(){


  const CODIGO: Marca = {

    nombre: this.crearmarcaForm.get('nombre')?.value

  }
  
  console.log(CODIGO);
  this._marcaService.guardarMarca(CODIGO).subscribe(data => {

    this.toastr.success('La marca fue registrada con éxito!', 'Marca registrada!')
    this.router.navigate(['/dashboard-gerente/marca'])
  },error =>{
    console.log(error);
    this.crearmarcaForm.reset();
  }
)



}

}