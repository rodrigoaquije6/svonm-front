import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';//este import no debería ir si usaramos un componente header, explicación más abajo
import { ToastrService } from 'ngx-toastr';
import { Almacen } from 'src/app/models/almacen';
import { AlmacenService } from 'src/app/services/almacen.service';

@Component({
  selector: 'app-editar-stock',
  templateUrl: './editar-stock.component.html',
  styleUrls: ['./editar-stock.component.css']
})
export class EditarStockComponent implements OnInit{


listAlmacen = [ {_id:1, codigo:"0AN7237U",nombre:"Arnette A-Volution", tipo:"Lentes de sol", stock:15},
{_id:2, codigo:"0AN7241U",nombre:"Arnette A.T.", tipo:"Lentes", stock:8},
{_id:3, codigo:"0OX5076",nombre:"OakleySway Bar 0.5", tipo:"Lentes de sol Negros", stock:10}
]

almacenForm: FormGroup;

titulo = 'Editar Stock';

id: string | null;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private _almacenService: AlmacenService,
    private api: LoginService,) {
    this.almacenForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      stock: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditar();
  }

  
  agregarStock() {

    if (this.almacenForm.invalid) {
      this.toastr.error('Por favor, complete el formulario correctamente.', 'Error');
      return;
    }

    const ALMACEN: Almacen = {
      codigo: this.almacenForm.get('codigo')?.value,
      nombre: this.almacenForm.get('nombre')?.value,
      tipo: this.almacenForm.get('tipo')?.value,
      stock: this.almacenForm.get('stock')?.value,
    }

    if (this.id !== null) {
      //editamos luna
      /*
      this._almacenService.editarLuna(this.id, ALMACEN).subscribe(data => {
        this.toastr.info('El stock fue actualizado con éxito!', 'Stock Actualizada!')
        this.router.navigate(['/dashboard-gerente/almacen']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.almacenForm.reset();
        }
        //console.log(error);
        //this.lunaForm.reset();
      })*/

    }
  }

  esEditar() {
    //codigo de prueba sin db
    if (this.id !== null) {
      this.almacenForm.setValue({
        codigo: this.listAlmacen[parseInt(this.id)-1].codigo,
        nombre: this.listAlmacen[parseInt(this.id)-1].nombre,
        tipo: this.listAlmacen[parseInt(this.id)-1].tipo,
        stock: this.listAlmacen[parseInt(this.id)-1].stock,
      })

      /*
      this.titulo = 'Editar Luna';
      this._almacenService.obtenerAlmacen(this.id).subscribe(data => {
        this.almacenForm.setValue({
          material: data.material,
          precio: data.precio,
        })
      })*/
    }
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('almacen');
    this.router.navigate(['login']);
  }
}
