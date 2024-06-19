import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;

  producto: string | null = null;

  titulo = 'Crear producto'

  id: string | null;

  marca: any[] = [];

  tipoP: any[] = [];

  urlMarca = 'https://zany-space-sniffle-q7777qjxj76q397q-4200.app.github.dev/api/crear-marca/';

  urlTipo = 'https://zany-space-sniffle-q7777qjxj76q397q-4200.app.github.dev/api/tipoProducto/';

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute,
    private api: LoginService,
    private http: HttpClient) {
    // Formulario común para todos los productos
    this.productoForm = this.fb.group({
      codigo: ['', Validators.required],
      tipoProducto: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: [''],
      marca: ['', Validators.required],
      stock: [0],
      stockMinimo: [2],
      estado: ['Activo'],
      color: [''],
      genero: [''],
      forma: [''],
      colorlente: [''],
      protuv: ['']
    });

    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    //this.esEditar();
    this.obtenerMarca();
    this.obtenerTipoProducto();
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

  obtenerTipoProducto() {
    this.http.get<any[]>(this.urlTipo).subscribe(
      (tipoPr) => {
        this.tipoP = tipoPr;
      },
      (error) => {
        console.error('Error al obtener los tipos de productos', error);
      }
    );
  }

  onItemChange(producto: string | null) {
    this.producto = producto;
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
      estado: productoData.estado
    };
  
    // Verificar el tipo de producto y asignar los atributos específicos
    if (productoData.tipoProducto === 'Montura') {
      // Asignar los atributos específicos de Montura
      producto.color = productoData.color;
      producto.genero = productoData.genero;
      producto.forma = productoData.forma;
    } else if (productoData.tipoProducto === 'Lentes de sol') {
      // Asignar los atributos específicos de Lentes de sol
      producto.color = productoData.color;
      producto.genero = productoData.genero;
      producto.forma = productoData.forma;
      producto.colorlente = productoData.colorlente;
      producto.protuv = productoData.protuv;
    }
  
    // Llamar al servicio para guardar el producto
    this._productoService.guardarProducto(producto).subscribe({
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
        console.error('Error al registrar el producto:', error);
        this.toastr.error('Hubo un error al registrar el producto.', 'Error');
        this.productoForm.reset();
      }
    });
  }

  /*esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        const productoFormValues: any = {
          codigo: data.codigo,
          tipoProducto: data.tipoProducto,
          nombre: data.nombre,
          precio: data.precio,
          imagen: data.imagen,
          marca: data.marca,
          color: '',
          genero: '',
          forma: '',
          colorlente: '',
          protuv: ''
        };
  
        // Asignar los atributos específicos dependiendo del tipo de producto
        if (data.tipoProducto === 'Montura') {
          productoFormValues.color = data.color;
          productoFormValues.genero = data.genero;
          productoFormValues.forma = data.forma;
        } else if (data.tipoProducto === 'Lentes de sol') {
          productoFormValues.color = data.color;
          productoFormValues.genero = data.genero;
          productoFormValues.forma = data.forma;
          productoFormValues.colorlente = data.colorlente;
          productoFormValues.protuv = data.protuv;
        }
  
        this.productoForm.setValue(productoFormValues);
      });
    }
  }*/

isLoggedIn: boolean = this.api.isLogged();

onClickLogout() {
  localStorage.removeItem('token');
  this.router.navigate(['login']);
}
}