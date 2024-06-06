import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { VentaService } from 'src/app/services/venta.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  styleUrls: ['./registrar-venta.component.css']
})
export class RegistrarVentaComponent implements OnInit{

  ventaForm: FormGroup;
  productosForm: FormGroup;

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

  products: any[] = [];
  selectedProducts: any[] = []; // To store selected products

  titulo = 'Crear venta';

  id: string | null;

  marca: any[] = [];
  url = 'https://shiny-tribble-rqj5r9gj7xwf5x55-4000.app.github.dev/api/crear-marca/'; //http://localhost:4000/api/crear-marca/

  constructor(
    private productService: ProductoService,
    private fb: FormBuilder,
    private fbProducto: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _ventaService: VentaService,
    private aRouter: ActivatedRoute,
    private http: HttpClient,
    private api: LoginService) {
    this.ventaForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      fechaVenta:'',
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
      vendedor:['', Validators.required],
      total:['', Validators.required],
      acuenta: '',
      saldo: '',
      tipoLuna: '',
      matLuna: '',
      conSeguimiento: [true, Validators.required],
      tratamientos:[],
      productos: []
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
    this.productosForm = this.fbProducto.group({
      rows: this.fbProducto.array([])
    })
  }

  ngOnInit(): void {
    //this.productService.getProducto();
    //this.esEditar();
  }

  /*obtenerProductos() {
    this.http.get<any[]>(this.url).subscribe(
      (productos) => {
        this.products = productos;
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }*/

  get rows(): FormArray {
    return this.productosForm?.get('rows') as FormArray;
  }
  
  createRow(): FormGroup {
    return this.fbProducto.group({
        inputField: [''], // Initialize with a default value
    });
}
  addRow(): void {
    const newFormGroup = this.fbProducto.group({
      codigo: '',
      tipoProducto: '',
      nombre: '',
      precio: '',
      imagen: '',
      marca: '',
      fechaCreacion: '',
    });
    this.rows.push(newFormGroup); // Initialize with a default value
  }
  removeLastRow(): void {
    if (this.rows.length > 0) {
      this.rows.removeAt(this.rows.length - 1);
    }
  }

  extractProductosFormArrayValues() {
    const rows = this.productosForm.get('rows') as FormArray;
    if (rows) {
      for (let i = 0; i < rows.controls.length; i++) {
        const rowGroup = rows.at(i) as FormGroup;
        const productoObj = {
          codigo: rowGroup.get('codigo')?.value,
          nombre: rowGroup.get('nombre')?.value,
          marca: rowGroup.get('marca')?.value,
          tipoProducto: rowGroup.get('tipoProducto')?.value,
          precio: rowGroup.get('precio')?.value
        };
        this.selectedProducts.push(productoObj);
      }
      console.log(this.selectedProducts); // Output the array of objects
    } else {
      console.error("Form array 'rows' is undefined.");
    }
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

  agregarVenta() {
    this.extractProductosFormArrayValues();
    const Venta = {
      nombreCliente: this.ventaForm.get('nombreCliente')?.value,
      fechaVenta: this.ventaForm.get('fechaVenta')?.value,
      celCliente: this.ventaForm.get('celCliente')?.value,
      dirCliente: this.ventaForm.get('dirCliente')?.value,
      fijCliente: this.ventaForm.get('fijCliente')?.value,
      corrCliente: this.ventaForm.get('corrCliente')?.value,
      odEsfera: this.ventaForm.get('odEsfera')?.value,
      odCilindro: this.ventaForm.get('odCilindro')?.value,
      odEje: this.ventaForm.get('odEje')?.value,
      odAVLejos: this.ventaForm.get('odAVLejos')?.value,
      odAVCerca: this.ventaForm.get('odAVCerca')?.value,
      oiEsfera: this.ventaForm.get('oiEsfera')?.value,
      oiCilindro: this.ventaForm.get('oiCilindro')?.value,
      oiEje: this.ventaForm.get('oiEje')?.value,
      oiAVLejos: this.ventaForm.get('oiAVLejos')?.value,
      oiAVCerca: this.ventaForm.get('oiAVCerca')?.value,
      odAdd: this.ventaForm.get('odAdd')?.value,
      odAltura: this.ventaForm.get('odAltura')?.value,
      odCurva: this.ventaForm.get('odCurva')?.value,
      oiAdd: this.ventaForm.get('oiAdd')?.value,
      oiAltura: this.ventaForm.get('oiAltura')?.value,
      oiCurva: this.ventaForm.get('oiCurva')?.value,
      DipLejos: this.ventaForm.get('DipLejos')?.value,
      DipCerca: this.ventaForm.get('DipCerca')?.value,
      observaciones:this.ventaForm.get('observaciones')?.value,
      optometra:this.ventaForm.get('optometra')?.value,
      fechaEntrega:this.ventaForm.get('fechaEntrega')?.value,
      vendedor:this.ventaForm.get('vendedor')?.value,
      total:this.ventaForm.get('total')?.value,
      acuenta:this.ventaForm.get('acuenta')?.value,
      saldo:this.ventaForm.get('saldo')?.value,
      tipoLuna: this.ventaForm.get('tipoLuna')?.value,
      matLuna: this.ventaForm.get('matLuna')?.value,
      conSeguimiento: this.ventaForm.get('conSeguimiento')?.value,
      tratamientos: this.tratamientosSelected,
      productos: this.selectedProducts
    }

    //no deberia usarse
    if (this.id !== null) {
      //editamos rol
      this._ventaService.editarVenta(this.id, Venta).subscribe(data => {
        this.toastr.info('La venta fue actualizada con éxito!', 'Venta Actualizada!')
        this.router.navigate(['/dashboard-trabajador/venta']);
      }, error => {
        console.log(error);
        this.ventaForm.reset();
      })

    } else {

      console.log(Venta);
      this._ventaService.guardarVenta(Venta).subscribe(data => {
        this.toastr.success('La venta fue registrada con éxito!', 'Venta Registrada!');
        this.router.navigate(['/dashboard-trabajador/venta']);
      }, error => {
        console.log(error);
        this.ventaForm.reset();
      })
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

  onClickLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['login']);
  }

}
