import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { LenteSol } from 'src/app/models/lenteSol';
import { HttpClient } from '@angular/common/http';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-editar-lente-sol',
  templateUrl: './editar-lente-sol.component.html',
  styleUrls: ['./editar-lente-sol.component.css']
})
export class EditarLenteSolComponent implements OnInit {

  productoForm: FormGroup;

  producto: string | null = "null";

  id: string | null;

  marca: any[] = [];

  url = 'http://localhost:4000/api/crear-marca/'; //http://localhost:4000/api/rol/

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
      estado: ['', Validators.required],
      genero: ['', Validators.required],
      color: ['', Validators.required],
      forma: ['', Validators.required],
      colorlente: ['', Validators.required],
      protuv: ['', Validators.required],
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
      stock: productoData.stock,
      stockMinimo: productoData.stockMinimo,
      estado: productoData.estado,
      genero: productoData.genero,
      forma: productoData.forma,
      color: productoData.color,
      colorlente: productoData.colorlente,
      protuv: productoData.protuv
    };

    // Llamar al servicio para guardar el producto
    if (this.id !== null) {
      this._productoService.editarProducto(this.id, producto).subscribe({
        next: () => {
          if (productoData.tipoProducto.nombre === 'Montura') {
            this.toastr.success('La montura fue registrada con éxito!', 'Montura Registrada!');
          } else if (productoData.tipoProducto.nombre === 'Lentes de sol') {
            this.toastr.success('Los lentes de sol fueron registrados con éxito!', 'Lentes de sol Registrados!');
          } else {
            this.toastr.success('El producto fue registrado con éxito!', 'Producto Registrado!');
          }
          this.router.navigate(['/dashboard-gerente/gestionar-producto']);
        },
        error: (error) => {
          console.error('Error al registrar el producto:', error);
          this.toastr.error('Hubo un error al registrar el producto.', 'Error');
          this.productoForm.reset();
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
          stock: data.stock,
          stockMinimo: data.stockMinimo,
          estado: data.estado,
          color: data.color,
          genero: data.genero,
          forma: data.forma,
          colorlente: data.colorlente,
          protuv: data.protuv,
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