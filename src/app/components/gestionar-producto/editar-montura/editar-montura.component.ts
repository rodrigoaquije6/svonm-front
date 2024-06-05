import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { MonturaService } from 'src/app/services/montura.service';
import { Montura } from 'src/app/models/montura';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-montura',
  templateUrl: './editar-montura.component.html',
  styleUrls: ['./editar-montura.component.css']
})
export class EditarMonturaComponent implements OnInit {
  productoForm: FormGroup;

  producto: string | null = "null";

  id: string | null;

  marca: any[] = [];

  url = 'https://bug-free-telegram-wwv6475qj9536rj-4000.app.github.dev/api/crear-marca/'; //http://localhost:4000/api/rol/

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _monturaService: MonturaService,
    private aRouter: ActivatedRoute,
    private api: LoginService,
    private http: HttpClient) {
    this.productoForm = this.fb.group({
      codigo: ['', Validators.required],
      tipoProducto: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required],
      marca: ['', Validators.required],
      genero: [''],
      color: [''],
      forma: [''],
    })

    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditar();
    this.obtenerMarca();
  }

  obtenerMarca() {
    this.http.get<any[]>(this.url).subscribe(
      (marcas) => {
        this.marca = marcas;
      },
      (error) => {
        console.error('Error al obtener las marcas de los productos', error);
      }
    );
  }

  onItemChange(producto: string | null) {
        console.log('Producto seleccionado:', producto);
        this.producto = producto;
  }

  agregarMonturaForm() {

    if (this.productoForm.invalid) {
      this.toastr.error('Por favor, complete el formulario correctamente.', 'Error');
      return;
    }

    const MONTURA: Montura = {
      productoId: this.productoForm.get('productoId')?.value,
      color: this.productoForm.get('color')?.value,
      genero: this.productoForm.get('genero')?.value,
      forma: this.productoForm.get('forma')?.value,
      
    }

    if (this.id !== null) {
      this._monturaService.editarMontura(this.id, MONTURA).subscribe(data => {
        this.toastr.info('El producto fue actualizado con éxito!', 'Producto Actualizado!')
        this.router.navigate(['/dashboard-gerente/gestionar-producto']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.productoForm.reset();
        }
        //console.log(error);
        //this.gestionarproductoForm.reset();
      })
    } else {
      console.log(MONTURA);
      this._monturaService.guardarMontura(MONTURA).subscribe(data => {
        this.toastr.success('El producto fue registrado con éxito!', 'Producto Registrado!');
        this.router.navigate(['/dashboard-gerente/gestionar-producto']);
      }, error => {
        if (error.error && error.error.msg) {
          error.error.msg.forEach((errorMessage: string) => {
            //const errorMessage = error.error.msg.join('\n');
            this.toastr.error(errorMessage, 'Error');
          });
        } else {
          console.log(error);
          this.productoForm.reset();
        }
        //console.log(error);
        //this.gestionarproductoForm.reset();
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this._monturaService.obtenerMontura(this.id).subscribe(data => {
        this.productoForm.setValue({
          codigo: data.codigo,
          tipoProducto: data.tipoProducto,
          nombre: data.nombre,
          precio: data.precio,
          imagen: data.imagen,
          marca: data.marca,
          color: data.color,
          genero: data.genero,
          forma: data.forma
        })
      })
    }
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
