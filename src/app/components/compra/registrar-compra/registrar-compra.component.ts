import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';


@Component({
  selector: 'app-registrar-compra',
  templateUrl: './registrar-compra.component.html',
  styleUrls: ['./registrar-compra.component.css']
})
export class RegistrarCompraComponent {

  ingresoForm: FormGroup;
  detalleIngresoForm: FormGroup;

  proveedores: Proveedor[] = [];
  selectedProveedor: Proveedor | undefined;
  proveedorSeleccionadoId: string | null = null; // Variable para almacenar el _id del proveedor seleccionado


  tratamientosOptions: { _id: string, nombre: string, precio: number }[] = [];
  tratamientosSeleccionados: any[] = [];

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  selectedProduct: Producto | undefined;
  cantidad: number = 0;
  productosAgregados: (Producto & { cantidad: number; total: number })[] = [];

  descuento: number = 0;
  impuesto: number = 0;
  subtotal: number = 0;
  total: number = 0;

  totalProductos: number = 0;
  totalTratamientos: number = 0;

  titulo = 'Crear Ingreso';

  id: string | null;

  constructor(
    private _productoService: ProductoService,
    private _proveedorService: ProveedorService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private http: HttpClient,
    private api: LoginService) {
    this.ingresoForm = this.fb.group({
      observacion: ['', Validators.required],
      descuento: ['', Validators.required],
      impuesto: ['', Validators.required],
      subtotal: ['', Validators.required],
      total: ['', Validators.required],
      fechaEntregaEstimada: ['', Validators.required],
      estado: ['Pendiente'],
      idProveedor: ['', Validators.required],
      idTrabajador: ['661f922817a3412bdbe33107', Validators.required],
      productosAgregados: this.fb.array([]),
    });
    this.detalleIngresoForm = this.fb.group({
      cantidad: ['', Validators.required],
      total: ['', Validators.required],
      idProducto: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerProveedores();
  };

  obtenerProductos() {
    this._productoService.getProductos().subscribe(
      (productos: Producto[]) => {
        this.productos = productos;
        this.productosFiltrados = [...this.productos];
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  obtenerProveedores() {
    this._proveedorService.getProveedores().subscribe(
      (proveedores: Proveedor[]) => {
        this.proveedores = proveedores;
      },
      (error) => {
        console.error('Error al obtener los proveedores:', error);
      }
    );
  }

  onProveedorChange(event: any) {
    const proveedorId = event.target.value;

    if (proveedorId) {
      this.proveedorSeleccionadoId = proveedorId; // Almacenar el _id del proveedor seleccionado

      // Filtrar productos por el proveedor seleccionado
      this.productosFiltrados = this.productos.filter(producto => producto.proveedor === proveedorId);
    } else {
      this.proveedorSeleccionadoId = null;
    }
  }
  
  agregarProducto() {
    // Verificar si se ha seleccionado un producto y la cantidad es válida
    if (this.selectedProduct && this.cantidad > 0) {
      // Verificar si el producto ya está en la lista
      const productoExistente = this.productosAgregados.find(p => p._id === this.selectedProduct?._id);

      if (productoExistente) {
        // Si el producto ya existe, mostrar un mensaje o manejar como desees
        this.toastr.warning('El producto ya ha sido agregado. Si deseas modificar la cantidad, elimínalo y agrégalo nuevamente.', 'Advertencia');
      } else {
        // Calcular el total del producto multiplicando la cantidad por el precio
        const total = this.cantidad * this.selectedProduct.precio;

        // Agregar el producto al array de productos agregados
        this.productosAgregados.push({
          ...this.selectedProduct,
          cantidad: this.cantidad,
          total: total
        });

        // Actualizar el formulario de ingreso con el nuevo producto agregado
        const detalleIngresoArray = this.ingresoForm.get('productosAgregados') as FormArray;
        detalleIngresoArray.push(this.fb.group({
          _id: this.selectedProduct._id,
          cantidad: this.cantidad,
          total: total
        }));

        // Limpiar el producto seleccionado y la cantidad después de agregar
        this.selectedProduct = undefined;
        this.cantidad = 0;

        // Recalcular el total de productos y el total general
        this.calcularTotalProductos();
        //this.calcularTotalGeneral();
      }
    } else {
      this.toastr.error('La cantidad ingresada no es válida o el producto no ha sido seleccionado.', 'Error');
    }
  }

  quitarProducto(index: number) {
    this.productosAgregados.splice(index, 1);
    const detalleIngresoArray = this.ingresoForm.get('productosAgregados') as FormArray;
    detalleIngresoArray.removeAt(index);
    this.calcularTotalProductos();
    //this.calcularTotalGeneral();
  }

  calcularTotales() {
    this.subtotal = this.productosAgregados.reduce((acc, prod) => acc + prod.total, 0);
    const descuentoMonto = (this.subtotal * this.descuento) / 100;
    const impuestoMonto = ((this.subtotal - descuentoMonto) * this.impuesto) / 100;
    this.total = this.subtotal - descuentoMonto + impuestoMonto;
  }

  // Función para calcular el total de los productos seleccionados
  calcularTotalProductos() {
    this.totalProductos = this.productosAgregados.reduce((total, producto) => total + (producto.total || 0), 0);
  }

  // Función para calcular el total de los tratamientos seleccionados
  calcularTotalTratamientos() {
    let totalTratamientos = 0;
    this.tratamientosSeleccionados.forEach((tratamiento: any) => {
      totalTratamientos += tratamiento.precio;
    });
    return totalTratamientos;
  }

  calcularTotal(selectedProduct: any) {
    console.log('Cantidad actual:', this.cantidad); // Asegúrate de que esto muestra el valor correcto
    // Verificar que la cantidad sea un número válido
    if (selectedProduct) {
      // Calcular el total multiplicando el precio por la cantidad
      selectedProduct.total = selectedProduct.precio * selectedProduct.cantidad;
    } else {
      console.error('selectedProduct no está definido.');
    }
  }

  /*calcularTotalGeneral() {
    // Calcula el total de productos
    let totalProductos = 0;
    this.productosAgregados.forEach(producto => {
      totalProductos += producto.total;
      console.log('Total del producto', producto.nombre, ':', producto.total);
    });
    let totalTratamientos = this.calcularTotalTratamientos();
    let costoTipoLuna = this.tiposLunaOptions.find(tipo => tipo._id === this.ventaForm.get('idTipoLuna')?.value)?.precio || 0;
    let costoMaterialLuna = this.materialLunaOptions.find(material => material._id === this.ventaForm.get('idMaterialLuna')?.value)?.precio || 0;

    let totalGeneral = totalProductos + totalTratamientos + costoTipoLuna + costoMaterialLuna;

    // Actualiza el valor del campo "total" en el formulario
    this.ventaForm.get('total')?.setValue(totalGeneral);

    let adelanto = this.ventaForm.get('aCuenta')?.value || 0;

    // Calcular el saldo
    let saldo = totalGeneral - adelanto;

    // Actualizar el valor del campo "saldo" en el formulario
    this.ventaForm.get('saldo')?.setValue(saldo);
  }*/

  /*guardarVenta() {
    if (this.ventaForm.invalid) {
      // Aquí maneja la validación del formulario de venta
      this.toastr.error('Por favor, complete todos los campos correctamente en el formulario de venta.', 'Error');
      return;
    }

    const ventaData = this.ventaForm.value;

    // Agregar tratamientos al detalle de tratamiento
    const tratamientosDetalle = this.tratamientosSeleccionados.map(tratamiento => ({
      _id: tratamiento._id
    }));
    ventaData.tratamientosAgregados = tratamientosDetalle;

    this._ventaService.guardarVenta(ventaData).subscribe(
      (data) => {
        this.toastr.success('La venta ha sido registrada exitosamente.', 'Venta Registrada');
        // Limpiar los formularios y los campos después de guardar la venta
        this.ventaForm.reset();
        this.productosAgregados = [];
        const detalleVentaArray = this.ventaForm.get('productosAgregados') as FormArray;
        detalleVentaArray.clear();
      },
      (error) => {
        console.error('Error al hacer la solicitud POST:', error);
        this.toastr.error('Ocurrió un error al guardar la venta. Por favor, inténtalo de nuevo más tarde.', 'Error');
      }
    );
  }*/

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['login']);
  }
}
