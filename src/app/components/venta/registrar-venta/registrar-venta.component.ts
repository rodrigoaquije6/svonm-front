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

  venta: any = {};
  detallesVenta: any[] = [];

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
  descuento: number = 0;
  productosAgregados: (Producto & { cantidad: number; descuento: number; total: number })[] = [];

  totalProductos: number = 0;
  totalTratamientos: number = 0;

  nombresTrabajador: string | undefined;
  apellidosTrabajador: string | undefined;

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
      estado: ['En Fabricación'],
      idCliente: ['', Validators.required],
      idTrabajador: ['', Validators.required],
      idTipoLuna: [''],
      idMaterialLuna: [''],
      productosAgregados: this.fb.array([]),
      tratamientosAgregados: this.fb.array([])
    });
    this.detalleVentaForm = this.fb.group({
      cantidad: ['', Validators.required],
      descuento: ['', Validators.required],
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
    this.obtenerPerfilTrabajador();
    this.esEditar();
  };

  obtenerPerfilTrabajador() {
    this.api.getProfile().subscribe(
      (profile) => {
        this.nombresTrabajador = profile.nombres;
        this.apellidosTrabajador = profile.apellidos;
        // Asigna el ID del trabajador automáticamente al formulario
        this.ventaForm.patchValue({
          idTrabajador: profile._id
        });
      },
      (error) => {
        console.error('Error al obtener el perfil del trabajador:', error);
        // Manejo de errores
      }
    );
  }

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
          if (error.error && error.error.errors) {
            error.error.errors.forEach((errorDetail: any) => {
              // Mostrar cada mensaje de error usando Toastr
              this.toastr.error(errorDetail, 'Error');
            });
          } else {
            console.log(error);
            this.toastr.error('Ocurrió un error al intentar guardar el ingreso.', 'Error');
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
          this.clienteForm.reset();
        },
        error => {
          if (error.error && error.error.errors) {
            error.error.errors.forEach((errorMessage: string) => {
              this.toastr.error(errorMessage, 'Error');
            });
          } else {
            console.log(error);
          }
        }
      );
    }
  }

  obtenerMatLuna() {
    this._lunaService.getLunas().subscribe(
      (materiales: any[]) => {
        this.materialLunaOptions = materiales;
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
      },
      (error) => {
        console.error('Error al obtener los tipos de luna:', error);
      }
    );
  }

  obtenerProductos() {
    this._productoService.getProductosActivos().subscribe(
      (productos: Producto[]) => {
        this.productos = productos;
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
      },
      (error) => {
        console.error('Error al obtener los clientes:', error);
      }
    );
  }

  onClienteChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const clienteId = target.value;

    // Convertir cliente._id a cadena para asegurar que ambos lados de la comparación sean cadenas
    this.selectedCliente = this.clientes.find(cliente => String(cliente._id) === clienteId);
  }

  onProductChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const productId = target.value;

    this.selectedProduct = this.productos.find(producto => String(producto._id) === productId);

    if (this.selectedProduct) {
      this.cantidad = 1;
      this.descuento = 0;
    }
  }

  agregarProducto() {
    // Verificar si se ha seleccionado un producto y la cantidad es válida
    if (this.selectedProduct && this.cantidad > 0) {

      if (this.descuento < 0) {
        this.toastr.error('El descuento no puede ser negativo.', 'Error');
        return;
      }
      // Verificar si el producto ya ha sido agregado
      const productoExistente = this.productosAgregados.find(producto => producto._id === this.selectedProduct?._id);
      if (productoExistente) {
        this.toastr.warning('El producto ya ha sido agregado. Si deseas modificar la cantidad, elimínalo y agrégalo nuevamente.', 'Advertencia');
        this.detalleVentaForm.reset();
        this.selectedProduct = undefined;
        this.cantidad = 0;
        this.descuento = 0;
        return;
      }

      // Verificar si la cantidad ingresada es menor o igual al stock disponible
      if (this.cantidad <= this.selectedProduct.stock) {
        // Calcular el total del producto multiplicando la cantidad por el precio
        const total = (this.selectedProduct.precio * (1 - this.descuento / 100)) * this.cantidad;

        // Agregar el producto al array de productos agregados
        this.productosAgregados.push({
          ...this.selectedProduct,
          cantidad: this.cantidad,
          descuento: this.descuento,
          total: total
        });

        // Actualizar el formulario de venta con el nuevo producto agregado
        const detalleVentaArray = this.ventaForm.get('productosAgregados') as FormArray;
        detalleVentaArray.push(this.fb.group({
          _id: this.selectedProduct._id,
          cantidad: this.cantidad,
          descuento: this.descuento,
          total: total
        }));

        // Limpiar el producto seleccionado y la cantidad después de agregar
        this.detalleVentaForm.reset();
        this.selectedProduct = undefined;
        this.cantidad = 0;
        this.descuento = 0;

        // Recalcular el total de productos y el total general
        this.calcularTotalProductos();
        this.calcularTotalGeneral();
      } else {
        this.toastr.error('La cantidad ingresada supera el stock disponible para este producto.', 'Error');
        this.cantidad = 0;
      }
    } else {
      this.toastr.error('Por favor, seleccione un producto y asegúrese de ingresar una cantidad válida.', 'Error');
      this.cantidad = 0;
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
    if (selectedProduct) {
      // Verificar que la cantidad y el descuento sean válidos
      if (this.cantidad > 0 && this.descuento >= 0) {
        // Calcular el total multiplicando el precio por la cantidad y aplicando el descuento
        const precioConDescuento = selectedProduct.precio * (1 - this.descuento / 100);
        selectedProduct.total = precioConDescuento * this.cantidad;
      } else {
        console.error('Cantidad o descuento no válidos.');
      }
    } else {
      console.error('selectedProduct no está definido.');
    }
  }

  calcularTotalGeneral() {
    // Calcula el total de productos
    let totalProductos = 0;
    this.productosAgregados.forEach(producto => {
      totalProductos += producto.total;
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
      this.toastr.error('Por favor, complete todos los campos correctamente en el formulario de venta.', 'Error');
      return;
    }

    // Validar de nuevo antes de guardar
    if (!this.ventaForm.get('idTipoLuna')?.value || !this.ventaForm.get('idMaterialLuna')?.value ||
      !this.ventaForm.get('oDEsfera')?.value || !this.ventaForm.get('oIEsfera')?.value ||
      !this.ventaForm.get('oDCilindro')?.value || !this.ventaForm.get('oICilindro')?.value ||
      !this.ventaForm.get('oDEje')?.value || !this.ventaForm.get('oIEje')?.value ||
      !this.ventaForm.get('oDAvLejos')?.value || !this.ventaForm.get('oIAvLejos')?.value ||
      !this.ventaForm.get('oDAvCerca')?.value || !this.ventaForm.get('oIAvCerca')?.value ||
      !this.ventaForm.get('oDAdd')?.value || !this.ventaForm.get('oIAdd')?.value ||
      !this.ventaForm.get('oDAltura')?.value || !this.ventaForm.get('oIAltura')?.value ||
      !this.ventaForm.get('oDCurva')?.value || !this.ventaForm.get('oICurva')?.value ||
      !this.ventaForm.get('dipLejos')?.value || !this.ventaForm.get('dipCerca')?.value ||
      !this.ventaForm.get('tratamientosAgregados')?.value
    ) {
      this.ventaForm.get('estado')?.setValue('Finalizada');
    } else {
      this.ventaForm.get('estado')?.setValue('En Fabricación');
    }

    const ventaData = this.ventaForm.value;

    // Agregar tratamientos al detalle de tratamiento
    const tratamientosDetalle = this.tratamientosSeleccionados.map(tratamiento => ({
      _id: tratamiento._id
    }));
    ventaData.tratamientosAgregados = tratamientosDetalle;

    // Verificar si this.id tiene un valor antes de usarlo
    if (this.id !== null && this.id !== undefined) {
      // Editar venta existente
      this.editarVentaExistente(ventaData);
    } else {
      // Guardar nueva venta
      this.guardarNuevaVenta(ventaData);
    }
  }

  private editarVentaExistente(ventaData: any) {
    this._ventaService.editarVenta(this.id!, ventaData).subscribe(
      data => {
        this.toastr.success('La venta ha sido actualizada exitosamente.', 'Venta Actualizada');
        this.router.navigate(['/dashboard-trabajador/venta']);
        // Limpiar los formularios y los campos después de guardar la venta
        this.ventaForm.reset();
        this.productosAgregados = [];
        const detalleVentaArray = this.ventaForm.get('productosAgregados') as FormArray;
        detalleVentaArray.clear();
      },
      error => {
        console.error('Error al hacer la solicitud PUT:', error);
        this.toastr.error('Ocurrió un error al actualizar la venta. Por favor, inténtalo de nuevo más tarde.', 'Error');
      }
    );
  }
  private guardarNuevaVenta(ventaData: any) {
    this._ventaService.guardarVenta(ventaData).subscribe(
      data => {
        this.toastr.success('La venta ha sido registrada exitosamente.', 'Venta Registrada');
        this.router.navigate(['/dashboard-trabajador/venta']);
        // Limpiar los formularios y los campos después de guardar la venta
        this.ventaForm.reset();
        this.productosAgregados = [];
        const detalleVentaArray = this.ventaForm.get('productosAgregados') as FormArray;
        detalleVentaArray.clear();
      },
      error => {
        if (error.error && error.error.errors) {
          error.error.errors.forEach((errorDetail: any) => {
            // Mostrar cada mensaje de error usando Toastr
            this.toastr.error(errorDetail.msg, 'Error');
          });
        } else {
          console.log(error);
          this.toastr.error('Ocurrió un error al intentar guardar el ingreso.', 'Error');
        }
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

  esEditar() {
    if (this.id !== null) { // Asumiendo que tienes un ID válido para buscar la venta
      this._ventaService.obtenerVenta(this.id).subscribe(
        (data: any) => { // Asegúrate de que 'data' tenga el tipo correcto según la respuesta del servicio
          this.venta = data.venta;
          this.detallesVenta = data.detallesVenta;

          // Asigna los valores al formulario usando patchValue
          this.ventaForm.patchValue({
            oDEsfera: data.venta.oDEsfera,
            oDCilindro: data.venta.oDCilindro,
            oDEje: data.venta.oDEje,
            oDAvLejos: data.venta.oDAvLejos,
            oDAvCerca: data.venta.oDAvCerca,
            oDAdd: data.venta.oDAdd,
            oDAltura: data.venta.oDAltura,
            oDCurva: data.venta.oDCurva,
            oIEsfera: data.venta.oIEsfera,
            oICilindro: data.venta.oICilindro,
            oIEje: data.venta.oIEje,
            oIAvLejos: data.venta.oIAvLejos,
            oIAvCerca: data.venta.oIAvCerca,
            oIAdd: data.venta.oIAdd,
            oIAltura: data.venta.oIAltura,
            oICurva: data.venta.oICurva,
            dipLejos: data.venta.dipLejos,
            dipCerca: data.venta.dipCerca,
            observacion: data.venta.observacion,
            aCuenta: data.venta.aCuenta,
            saldo: data.venta.saldo,
            total: data.venta.total,
            estado: data.venta.estado,
            idCliente: data.venta.idCliente._id,
            idTipoLuna: data.venta.idTipoLuna,
            idMaterialLuna: data.venta.idMaterialLuna
          });

          // Actualiza productosAgregados
          const productosAgregadosFormArray = this.ventaForm.get('productosAgregados') as FormArray;
          productosAgregadosFormArray.clear(); // Limpia el FormArray antes de agregar nuevos elementos
          if (Array.isArray(data.productosAgregados)) {
            data.productosAgregados.forEach((producto: any) => {
              productosAgregadosFormArray.push(this.fb.group({
                _id: producto._id,
                cantidad: producto.cantidad,
                total: producto.total
              }));
            });
          }

          // Actualiza tratamientosAgregados
          const tratamientosAgregadosFormArray = this.ventaForm.get('tratamientosAgregados') as FormArray;
          tratamientosAgregadosFormArray.clear(); // Limpia el FormArray antes de agregar nuevos elementos
          if (Array.isArray(data.tratamientosAgregados)) {
            data.tratamientosAgregados.forEach((tratamiento: any) => {
              tratamientosAgregadosFormArray.push(this.fb.group({
                _id: tratamiento._id
              }));
            });
          }
        },
        (error: any) => {
          console.error('Error al obtener la venta:', error);
          this.toastr.error('Error al obtener la venta. Por favor, inténtelo de nuevo más tarde.', 'Error');
        }
      );
    }
  }

  isLoggedIn: boolean = this.api.isLogged();

  onClickLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['login']);
  }

}