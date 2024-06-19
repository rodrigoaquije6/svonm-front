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
import { ClienteService } from 'src/app/services/cliente';
import { Cliente } from 'src/app/models/cliente';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { LunaService } from 'src/app/services/luna.service';
import { TipoLunaService } from 'src/app/services/tipoLuna.service';

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  styleUrls: ['./registrar-venta.component.css']
})
export class RegistrarVentaComponent implements OnInit {
  //clienteForm: FormGroup;
  ventaForm: FormGroup;
  detalleVentaForm: FormGroup;
  //detalleTratamientoForm: FormGroup;

  clienteForm: FormGroup;
  clientes: Cliente[] = [];
  selectedCliente: Cliente | undefined;

  tratamientosOptions: { _id: string, nombre: string, precio: number }[] = [];
  tratamientosSeleccionados: any[] = [];

  tiposLunaOptions: { _id: string, nombre: string, precio: number }[] = [];
  materialLunaOptions: { _id: string, material: string, precio: number }[] = [];

  productos: Producto[] = [];
  selectedProduct: Producto | undefined;
  cantidad: number = 0;
  productosAgregados: (Producto & { cantidad: number; total: number })[] = [];

  totalProductos: number = 0;
  totalTratamientos: number = 0;

  titulo = 'Crear venta';

  id: string | null;

  constructor(
    private _productoService: ProductoService,
    private _clienteService: ClienteService,
    private _tratamientoService: TratamientoService,
    private _lunaService: LunaService,
    private _tipoLunaService: TipoLunaService,
    private fb: FormBuilder,
    private fbProducto: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _ventaService: VentaService,
    private aRouter: ActivatedRoute,
    private http: HttpClient,
    private api: LoginService,
    private modalService: NgbModal) {
    this.clienteForm = this.fb.group({
      dni: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', Validators.required],
      estado: ['Activo']
    });
    this.ventaForm = this.fb.group({
      oDEsfera: '',
      oDCilindro: '',
      oDEje: '',
      oDAvLejos: '',
      oDAvCerca: '',
      oDAdd: '',
      oDAltura: '',
      oDCurva: '',
      oIEsfera: '',
      oICilindro: '',
      oIEje: '',
      oIAvLejos: '',
      oIAvCerca: '',
      oIAdd: '',
      oIAltura: '',
      oICurva: '',
      dipLejos: '',
      dipCerca: '',
      observacion: ['', Validators.required],
      aCuenta: ['', Validators.required],
      saldo: ['', Validators.required],
      total: ['', Validators.required],
      estado: ['En fabricación'],
      idCliente: ['', Validators.required],
      idTrabajador: ['661f922817a3412bdbe33107', Validators.required],
      idTipoLuna: '',
      idMaterialLuna: '',
      productosAgregados: this.fb.array([]),
      tratamientosAgregados: this.fb.array([])
    });
    this.detalleVentaForm = this.fb.group({
      cantidad: ['', Validators.required],
      total: ['', Validators.required],
      idProducto: ['', Validators.required],
    });
    /*this.detalleTratamientoForm = this.fb.group({
      idTratamiento: ['', Validators.required],
    });*/
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerClientes();
    this.obtenerTratamientos();
    this.obtenerTiposLuna();
    this.obtenerMatLuna();
  };

  openModal(content: any) {
    // Abre el modal para agregar un nuevo cliente
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // Aquí puedes manejar el resultado si es necesario
      console.log("Modal cerrado");
    }, (reason) => {
      // Aquí puedes manejar el cierre del modal si es necesario
      console.log("Modal cerrado con razón: ", reason);
    });
  }

  agregarCliente() {
    // Verificar si el formulario es válido
    if (this.clienteForm.invalid) {
      this.toastr.error('Por favor, complete el formulario correctamente.', 'Error');
      return;
    }

    // Crear un objeto Cliente con los datos del formulario
    const cliente: Cliente = {
      dni: this.clienteForm.get('dni')?.value,
      nombres: this.clienteForm.get('nombres')?.value,
      apellidos: this.clienteForm.get('apellidos')?.value,
      celular: this.clienteForm.get('celular')?.value,
      direccion: this.clienteForm.get('direccion')?.value,
      correo: this.clienteForm.get('correo')?.value,
      estado: this.clienteForm.get('estado')?.value
    };

    // Determinar si se está editando o creando un nuevo cliente
    if (this.id !== null) {
      // Editar cliente existente
      this._clienteService.editarCliente(this.id, cliente).subscribe(
        data => {
          this.toastr.info('El cliente fue actualizado con éxito!', 'Cliente Actualizado!');
          this.modalService.dismissAll();
        },
        error => {
          if (error.error && error.error.msg) {
            error.error.msg.forEach((errorMessage: string) => {
              this.toastr.error(errorMessage, 'Error');
            });
          } else {
            console.log(error);
            this.clienteForm.reset();
          }
        }
      );
    } else {
      // Agregar un nuevo cliente
      this._clienteService.guardarCliente(cliente).subscribe(
        data => {
          this.toastr.success('El cliente fue registrado con éxito!', 'Cliente Registrado!');
          this.modalService.dismissAll();
          this.obtenerClientes();
        },
        error => {
          if (error.error && error.error.msg) {
            error.error.msg.forEach((errorMessage: string) => {
              this.toastr.error(errorMessage, 'Error');
            });
          } else {
            console.log(error);
            this.clienteForm.reset();
          }
        }
      );
    }
  }

  obtenerMatLuna() {
    this._lunaService.getLunas().subscribe(
      (materiales: any[]) => {
        this.materialLunaOptions = materiales;
        console.log('Materiales de luna obtenidos:', this.materialLunaOptions);
      },
      (error) => {
        console.error('Error al obtener los materiales de luna:', error);
      }
    );
  }

  obtenerTiposLuna() {
    this._tipoLunaService.getTipoLunas().subscribe(
      (tipos: any[]) => {
        this.tiposLunaOptions = tipos;
        console.log('Tipos de luna obtenidos:', this.tiposLunaOptions);
      },
      (error) => {
        console.error('Error al obtener los tipos de luna:', error);
      }
    );
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe(
      (productos: Producto[]) => {
        this.productos = productos;
        console.log('Productos obtenidos:', this.productos);
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  obtenerClientes() {
    this._clienteService.getClientes().subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
        console.log('Clientes obtenidos:', this.clientes);
      },
      (error) => {
        console.error('Error al obtener los clientes:', error);
      }
    );
  }

  onClienteChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const clienteId = target.value;
    console.log('ID del cliente seleccionado:', clienteId);

    // Convertir cliente._id a cadena para asegurar que ambos lados de la comparación sean cadenas
    this.selectedCliente = this.clientes.find(cliente => String(cliente._id) === clienteId);
    console.log('Cliente seleccionado:', this.selectedCliente);
  }

  onProductChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const productId = target.value;
    console.log('ID del producto seleccionado:', productId);

    this.selectedProduct = this.productos.find(producto => String(producto._id) === productId);
    console.log('Producto seleccionado:', this.selectedProduct);

    if (this.selectedProduct) {
      this.cantidad = 1;
    }
  }

  agregarProducto() {
    // Verificar si se ha seleccionado un producto y la cantidad es válida
    if (this.selectedProduct && this.cantidad > 0) {
      // Verificar si la cantidad ingresada es menor o igual al stock disponible
      if (this.cantidad <= this.selectedProduct.stock) {
        // Calcular el total del producto multiplicando la cantidad por el precio
        const total = this.cantidad * this.selectedProduct.precio;
  
        // Agregar el producto al array de productos agregados
        this.productosAgregados.push({
          ...this.selectedProduct,
          cantidad: this.cantidad,
          total: total
        });
  
        // Actualizar el formulario de venta con el nuevo producto agregado
        const detalleVentaArray = this.ventaForm.get('productosAgregados') as FormArray;
        detalleVentaArray.push(this.fb.group({
          _id: this.selectedProduct._id,
          cantidad: this.cantidad,
          total: total
        }));
  
        // Limpiar el producto seleccionado y la cantidad después de agregar
        this.selectedProduct = undefined;
        this.cantidad = 0;
  
        // Recalcular el total de productos y el total general
        this.calcularTotalProductos();
        this.calcularTotalGeneral();
      } else {
        this.toastr.error('La cantidad ingresada supera el stock disponible para este producto.', 'Error');
      }
    } else {
      this.toastr.error('Por favor, seleccione un producto y asegúrese de ingresar una cantidad válida.', 'Error');
    }
  }

  quitarProducto(index: number) {
    this.productosAgregados.splice(index, 1);
    const detalleVentaArray = this.ventaForm.get('productosAgregados') as FormArray;
    detalleVentaArray.removeAt(index);
    this.calcularTotalProductos();
    this.calcularTotalGeneral();
  }

  obtenerTratamientos() {
    this._tratamientoService.getTratamientos().subscribe(
      (tratamientos: any[]) => {
        // Asigna los tratamientos obtenidos a tu lista de opciones de tratamiento
        this.tratamientosOptions = tratamientos;
        console.log('Tratamientos obtenidos:', this.tratamientosOptions);
      },
      (error) => {
        console.error('Error al obtener los tratamientos:', error);
      }
    );
  }

  updateCheckboxValues(tratamiento: any, event: any) {
    if (event.target.checked) {
      this.tratamientosSeleccionados.push(tratamiento);
    } else {
      const index = this.tratamientosSeleccionados.findIndex((t: any) => t._id === tratamiento._id);
      if (index !== -1) {
        this.tratamientosSeleccionados.splice(index, 1);
      }
    }
    // Luego de actualizar los tratamientos seleccionados, calcula el total general
    this.calcularTotalGeneral();

    // Obtener los _id de los tratamientos seleccionados
    const idsTratamientosSeleccionados = this.tratamientosSeleccionados.map((tratamiento: any) => tratamiento._id);

    console.log(idsTratamientosSeleccionados); // Mostrará todos los _id de los tratamientos seleccionados
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

  calcularTotalGeneral() {
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
  }

  guardarVenta() {
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
  }

  deseleccionarTipoLuna() {
    this.ventaForm.get('idTipoLuna')?.setValue(null);
    this.calcularTotalGeneral();
  }

  deseleccionarMaterialLuna() {
    this.ventaForm.get('idMaterialLuna')?.setValue(null);
    this.calcularTotalGeneral();
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
