import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoProducto } from 'src/app/models/tipoProducto';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';

@Component({
  selector: 'app-crear-tipo-producto',
  templateUrl: './crear-tipo-producto.component.html',
  styleUrls: ['./crear-tipo-producto.component.css']
})
export class CrearTipoProductoComponent implements OnInit {
  tipoProductoForm: FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _tipoProductoService: TipoProductoService) {
    this.tipoProductoForm = this.fb.group({
      nombre: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  agregarTipoProducto() {

    const TIPOPRODUCTO: TipoProducto = {
      nombre: this.tipoProductoForm.get('nombre')?.value
    }

    console.log(TIPOPRODUCTO);
    this._tipoProductoService.guardarTipoProducto(TIPOPRODUCTO).subscribe(data => {
      this.toastr.success('El tipo de producto fue registrado con éxito!', 'Tipo de producto Registrado!');
      this.router.navigate(['/dashboard-gerente/tipoProducto']);
    }, error =>{
      console.log(error);
      this.tipoProductoForm.reset();
    })

  }

}
