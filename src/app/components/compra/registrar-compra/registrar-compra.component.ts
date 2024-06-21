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
import { IngresoService } from 'src/app/services/ingreso.service';


@Component({
  selector: 'app-registrar-compra',
  templateUrl: './registrar-compra.component.html',
  styleUrls: ['./registrar-compra.component.css']
})
export class RegistrarCompraComponent {

  ingresoForm: FormGroup;
  detalleIngresoForm: FormGroup;

  proveedores: Proveedor[] = [];
  selectedProveedor: Proveedor | null = null;
  selectedProveedorId: string | null = null;

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  selectedProduct: Producto | null = null;
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
    private _ingresoService: IngresoService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private http: HttpClient,
    private api: LoginService) {
    this.ingresoForm = this.fb.group({
      observacion: ['', Validators.required],
      descuento: [''],
      impuesto: [''],
      subtotal: ['', Validators.required],
      total: ['', Validators.required],
      fechaEntregaEstimada: ['', [Validators.required, this.fechaEntregaValidator.bind(this)]],
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
    this.obtenerProveedores();
  }

  obtenerProveedores(): void {
    this._proveedorService.getProveedores().subscribe(
      (proveedores: Proveedor[]) => {
        this.proveedores = proveedores;
      },
      (error) => {
        console.error('Error al obtener los proveedores:', error);
      }
    );
  }

  onProveedorChange(event: any): void {
    const proveedorId = event.target.value;
    this.selectedProveedor = this.proveedores.find(proveedor => proveedor._id === proveedorId) || null;
    this.selectedProveedorId = proveedorId;
    this.filtrarProductosPorProveedor(proveedorId);

    // Limpiar productos agregados y el FormArray cuando cambia el proveedor
    this.productosAgregados = [];
    const detalleIngresoArray = this.ingresoForm.get('productosAgregados') as FormArray;
    detalleIngresoArray.clear();
    // Limpiar campos de descuento e impuesto
    this.ingresoForm.get('descuento')?.reset();
    this.ingresoForm.get('impuesto')?.reset();
    // Recalcular el subtotal y el total
    this.calcularSubtotal();
    this.calcularTotal();
  }

  onProductoChange(event: any): void {
    const productoId = event.target.value;
    this.selectedProduct = this.productosFiltrados.find(producto => producto._id === productoId) || null;
  }

  filtrarProductosPorProveedor(proveedorId: string): void {
    this._productoService.obtenerProductosPorProveedor(proveedorId).subscribe(
      (productos: Producto[]) => {
        this.productosFiltrados = productos;
        console.log('Productos filtrados:', this.productosFiltrados);
      },
      (error) => {
        console.error('Error al filtrar productos por proveedor:', error);
      }
    );
  }

  agregarProducto() {
    // Verificar si se ha seleccionado un producto y la cantidad es válida
    if (this.selectedProduct && this.cantidad > 0) {
      // Verificar si el producto ya está en la lista
      const productoExistente = this.productosAgregados.find(p => p._id === this.selectedProduct?._id);

      if (productoExistente) {
        // Si el producto ya existe, mostrar un mensaje o manejar como desees
        this.toastr.warning('El producto ya ha sido agregado. Si deseas modificar la cantidad, elimínalo y agrégalo nuevamente.', 'Advertencia');
        this.detalleIngresoForm.reset();
        this.selectedProduct = null;
        this.cantidad = 0;
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
        this.detalleIngresoForm.reset();
        this.selectedProduct = null;
        this.cantidad = 0;

        // Recalcular el subtotal y el total
        this.calcularSubtotal();
        this.calcularTotal();
      }
    } else {
      this.toastr.error('La cantidad ingresada no es válida o el producto no ha sido seleccionado.', 'Error');
    }
  }

  calcularSubtotal(): void {
    this.subtotal = this.productosAgregados.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    this.ingresoForm.get('subtotal')?.setValue(this.subtotal);
  }

  calcularTotal(): void {
    const descuento = this.ingresoForm.get('descuento')?.value || 0;
    const impuesto = this.ingresoForm.get('impuesto')?.value || 0;

    // Convertir descuento e impuesto a porcentaje
    const descuentoPorcentaje = descuento / 100;
    const impuestoPorcentaje = impuesto / 100;

    // Calcular montos ajustados
    const descuentoAmount = this.subtotal * descuentoPorcentaje;
    const impuestoAmount = this.subtotal * impuestoPorcentaje;

    // Calcular total final
    this.total = this.subtotal - descuentoAmount + impuestoAmount;

    // Actualizar el formulario con el nuevo total
    this.ingresoForm.get('total')?.setValue(this.total);
  }

  quitarProducto(index: number): void {
    this.productosAgregados.splice(index, 1);
    const detalleIngresoArray = this.ingresoForm.get('productosAgregados') as FormArray;
    detalleIngresoArray.removeAt(index); // Eliminar el producto del FormArray
    this.calcularSubtotal();
    this.calcularTotal();
  }

  // Función para validar la fecha de entrega estimada
  fechaEntregaValidator(control: FormGroup['controls']['fechaEntregaEstimada']) {
    if (!control.value) {
      return null; // Si no se ha ingresado fecha, no se realiza validación adicional
    }

    const selectedDate = new Date(control.value);
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 14); // Máximo 14 días después de hoy

    if (selectedDate < today || selectedDate > maxDate) {
      return { fechaInvalida: true }; // Devuelve un objeto si la fecha no es válida
    }

    return null; // Devuelve null si la fecha es válida
  }

  guardarIngreso() {
    if (this.ingresoForm.invalid) {
      // Aquí maneja la validación del formulario de venta
      this.toastr.error('Por favor, complete todos los campos correctamente en el formulario del ingreso.', 'Error');
      return;
    }

    const ingresoData = this.ingresoForm.value;

    // Asegurarse de que los productos agregados estén incluidos en el detalle del ingreso
    ingresoData.productosAgregados = this.productosAgregados.map(producto => ({
      _id: producto._id,
      cantidad: producto.cantidad,
      total: producto.total
    }));

    this._ingresoService.guardarIngreso(ingresoData).subscribe(
      (data) => {
        this.toastr.success('El ingreso ha sido registrado exitosamente.', 'Ingreso Registrado');
        this.router.navigate(['/dashboard-gerente/ingresos']);
        // Limpiar los formularios y los campos después de guardar el ingreso
        this.ingresoForm.reset();
        this.productosAgregados = [];
      },
      (error) => {
        console.error('Error al hacer la solicitud POST:', error);
        this.toastr.error('Ocurrió un error al guardar el ingreso. Por favor, inténtalo de nuevo más tarde.', 'Error');
      }
    );
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['login']);
  }
}
