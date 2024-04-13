import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit{
  productoForm: FormGroup;

  tiposDeProductos: any[] = [];

  url = 'https://fuzzy-space-bassoon-5wv69qr7jx7cvr6r-4000.app.github.dev/api/tipoProducto/' //http://localhost:4000/api/tipoProducto/

  constructor (private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _productoService: ProductoService,
    private http: HttpClient) { 
      this.productoForm = this.fb.group({
        nombre: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.obtenerTiposProducto();
  }

  obtenerTiposProducto(){
    this.http.get<any[]>(this.url).subscribe(
      (tipos) => {
        this.tiposDeProductos = tipos;
      },
      (error) => {
        console.error('Error al obtener los tipos de productos:', error);
      }
    );
  }

  agregarProducto() {

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('nombre')?.value
    }

    console.log(PRODUCTO);
    this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
      this.toastr.success('El producto fue registrado con éxito!', 'Producto Registrado!');
      this.router.navigate(['/dashboard-gerente/producto']);
    }, error =>{
      console.log(error);
      this.productoForm.reset();
    })

  }

}
