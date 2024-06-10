import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { VentaService } from 'src/app/services/venta.service';
import { ProductoService } from 'src/app/services/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  styleUrls: ['./registrar-venta.component.css']
})
export class RegistrarVentaComponent implements OnInit {
  //clienteForm: FormGroup;
  ventaForm: FormGroup;
  //detalleVentaForm: FormGroup;

  tratamientosOptions: { nombre: string, precio: number }[] = [
    { nombre: 'UV', precio: 10 },
    { nombre: 'Antirayas', precio: 20 },
    { nombre: 'Blue Protect', precio: 15 },
    { nombre: 'Blue Defense', precio: 10 },
    { nombre: 'Fotocromático', precio: 20 },
    { nombre: 'Transition', precio: 15 },
    { nombre: 'Color', precio: 10 },
    { nombre: 'Reduccion', precio: 20 },
    { nombre: 'Alto indice', precio: 15 }
  ];

  tratamientosSelected: { nombre: string, precio: number }[] = [];

  productos: any[] = [];
  productosSeleccionados: any[] = [];
  selectedProduct: any;
  cantidad: number = 1;
  titulo = 'Crear venta';

  id: string | null;

  marca: any[] = [];
  url = 'http://localhost:4000/api/crear-marca/'; //http://localhost:4000/api/crear-marca/

  constructor(
    private _productoService: ProductoService,
    private fb: FormBuilder,
    private fbProducto: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _ventaService: VentaService,
    private aRouter: ActivatedRoute,
    private http: HttpClient,
    private api: LoginService,
    private modalService: NgbModal) {
    this.ventaForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      fechaVenta: '',
      celCliente: ['', Validators.required],
      dirCliente: ['', Validators.required],
      fijCliente: ['', Validators.required],
      corrCliente: ['', Validators.required],
      odEsfera: '',
      odCilindro: '',
      odEje: '',
      odAVLejos: '',
      odAVCerca: '',
      oiEsfera: '',
      oiCilindro: '',
      oiEje: '',
      oiAVLejos: '',
      oiAVCerca: '',
      odAdd: '',
      odAltura: '',
      odCurva: '',
      oiAdd: '',
      oiAltura: '',
      oiCurva: '',
      DipLejos: '',
      DipCerca: '',
      observaciones: '',
      optometra: '',
      fechaEntrega: '',
      vendedor: ['', Validators.required],
      total: ['', Validators.required],
      acuenta: '',
      saldo: '',
      tipoLuna: '',
      matLuna: '',
      conSeguimiento: [true, Validators.required],
      tratamientos: [],
      productos: []
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe(
      (productos: Producto[]) => {
        this.productos = productos; // Asigna los productos obtenidos del servicio al array del componente
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  openModal(content: any) {
    // Cargar la lista de productos desde tu base de datos
    this._productoService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });

    // Abrir el modal
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // Aquí puedes manejar el resultado si es necesario
      console.log("Modal cerrado");
    }, (reason) => {
      // Aquí puedes manejar el cierre del modal si es necesario
      console.log("Modal cerrado con razón: ", reason);
    });
  }


  quitarProducto(producto: any) {
    // Encuentra el índice del producto en la lista de productos seleccionados
    const index = this.productosSeleccionados.indexOf(producto);
    // Si se encuentra el producto, lo elimina de la lista
    if (index !== -1) {
      this.productosSeleccionados.splice(index, 1);
    }
  }

  calcularTotal(producto: any) {
    producto.total = producto.precio * producto.cantidad;
  }


  updateConSeguimiento(event: any) {
    const value = event.target.value;
    if (value) {
      this.ventaForm.get('conSeguimiento')?.setValue(value);
    }
  }

  updateTipoLuna(event: any) {
    const value = event.target.value;
    if (value) {
      this.ventaForm.get('tipoLuna')?.setValue(value);
    }
  }

  updateMatLuna(event: any) {
    const value = event.target.value;
    if (value) {
      this.ventaForm.get('matLuna')?.setValue(value);
    }
  }

  updateCheckboxValues(option: { nombre: string, precio: number }, event: any) {
    if (event.target.checked) {
      this.tratamientosSelected.push(option);
    } else {
      const index = this.tratamientosSelected.findIndex(o => o.nombre === option.nombre);
      if (index !== -1) {
        this.tratamientosSelected.splice(index, 1);
      }
    }
  }



  /*esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this._ventaService.obtenerMontura(this.id).subscribe(data => {
        this.ventaForm.setValue({
          codigo: data.codigo,
          marca: data.marca,
          nombre: data.nombre,
          color: data.color,
          genero: data.genero,
          precio: data.precio,
          forma: data.forma,
          imagen: data.imagen,
        })
      })
    }
  }*/

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['login']);
  }

}
