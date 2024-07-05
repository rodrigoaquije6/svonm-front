import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ProductoService } from 'src/app/services/producto.service';

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

  proveedor: any[] = [];

  urlMarca = 'http://localhost:4000/api/crear-marca/';

  urlProveedor = 'http://localhost:4000/api/proveedor/';

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _productoService: ProductoService,
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
      proveedor: ['', Validators.required],
      stock: [''],
      stockMinimo: [''],
      estado: ['', Validators.required],
      color: ['', Validators.required],
      genero: ['', Validators.required],
      forma: ['', Validators.required],
      colorlente: [''],
      protuv: ['']
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.obtenerProveedor();
    this.obtenerMarca();
    this.esEditar();
  }

  obtenerMarca() {
    this.http.get<any[]>(this.urlMarca).subscribe(
      (marcas) => {
        this.marca = marcas;
      },
      (error) => {
        console.error('Error al obtener las marcas de los productos', error);
      }
    );
  }

  obtenerProveedor() {
    this.http.get<any[]>(this.urlProveedor).subscribe(
      (proveedores) => {
        this.proveedor = proveedores;
      },
      (error) => {
        console.error('Error al obtener los proveedores de los productos', error);
      }
    );
  }

  agregarProducto() {
    // Obtener los valores del formulario
    const productoData = this.productoForm.value;

    // Crear un nuevo producto con los datos del formulario
    const producto: any = {
      codigo: productoData.codigo,
      tipoProducto: productoData.tipoProducto,
      nombre: productoData.nombre,
      precio: productoData.precio,
      imagen: productoData.imagen,
      marca: productoData.marca,
      proveedor: productoData.proveedor,
      stock: productoData.stock,
      stockMinimo: productoData.stockMinimo,
      estado: productoData.estado,
      color: productoData.color,
      genero: productoData.genero,
      forma: productoData.forma,
    };

    // Llamar al servicio para guardar el producto
    if (this.id !== null) {
      this._productoService.editarProducto(this.id, producto).subscribe({
        next: (data) => {
          if (productoData.tipoProducto === 'Montura') {
            this.toastr.success('La montura fue registrada con éxito!', 'Montura Registrada!');
          } else if (productoData.tipoProducto === 'Lentes de sol') {
            this.toastr.success('Los lentes de sol fueron registrados con éxito!', 'Lentes de sol Registrados!');
          } else {
            this.toastr.success('El producto fue registrado con éxito!', 'Producto Registrado!');
          }
          this.router.navigate(['/dashboard-gerente/gestionar-producto']);
        },
        error: (error) => {
          if (error.error && error.error.msg) {
            error.error.msg.forEach((errorMessage: string) => {
              //const errorMessage = error.error.msg.join('\n');
              this.toastr.error(errorMessage, 'Error');
            });
          } else {
            console.log(error);
          }
        }
      });
    } else {
      this.toastr.error('No existe este producto', 'Error');
    }
  }

  esEditar() {
    if (this.id !== null) {
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        console.log(data);
        // Crear un objeto para los valores del formulario
        const formularioData: any = {
          codigo: data.codigo,
          tipoProducto: data.tipoProducto,
          nombre: data.nombre,
          precio: data.precio,
          imagen: data.imagen,
          marca: data.marca.nombre,
          proveedor: data.proveedor.nombre,
          stock: data.stock,
          stockMinimo: data.stockMinimo,
          estado: data.estado,
          color: data.color,
          genero: data.genero,
          forma: data.forma,
          colorlente: '',
          protuv: ''
        };

        // Asignar valores al formulario
        this.productoForm.setValue(formularioData);
      })
    }
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
