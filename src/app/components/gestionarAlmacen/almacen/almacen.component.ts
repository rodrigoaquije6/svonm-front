import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/models/rol';
import { Router } from '@angular/router';//este import no debería ir si usaramos un componente header, explicación más abajo
import { LoginService } from 'src/app/services/login.service';//este import no debería ir si usaramos un componente header, explicación más abajo
import { Almacen } from 'src/app/models/almacen';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlmacenService } from 'src/app/services/almacen.service';
import { ProductoService } from 'src/app/services/producto.service';

declare var bootstrap: any; // Declarar la variable bootstrap

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent implements OnInit{
  listAlmacen: any[] = [];
  listId: any[]=[];
  listProducto: any[]=[]
  TituloModal: string="";
  CodigoModal: string="";
  id: string = "";
  stock:number = 0;

  constructor(private _almacenService: AlmacenService,
              private _prouctoService: ProductoService,
              private toastr: ToastrService,
              private api: LoginService,
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit(): void {
    this.obtenerAlmacen();
  }

  obtenerAlmacen() {
    this._prouctoService.getProductos().subscribe(data => {
                  
      console.log(this._prouctoService);
        this.listProducto = data;
        
        console.log(this.listProducto);
        this._almacenService.getAlmacen().subscribe(data => {
        
          console.log(this._almacenService);
            this.listId = data;
            console.log(this.listId);
            this.bind();
            console.log(this.listAlmacen);
            
          }, error => {
            console.log(error);
          })

      }, error => {
        console.log(error);
        
      })
  }

  bind() {
    // Creamos un nuevo array donde almacenaremos los resultados
    this.listAlmacen = this.listProducto.map((obj, indice) => {
        // Creamos una copia del objeto original para no modificar el array original directamente
        let nuevoObjeto = { ...obj };

        // Si el índice es válido en el array listId, reemplazamos el primer campo (_id)
        if (indice < this.listId.length) {
            nuevoObjeto._id = this.listId[indice]._id; // Aquí reemplazamos el campo _id
         }

        return nuevoObjeto;
    });
    this.addStocktoAlmacen();
}

addStocktoAlmacen() {
  // Asumiendo que listAlmacen y listId tienen la misma longitud
  this.listAlmacen.forEach((almacen, index) => {
      almacen.stock = this.listId[index].stock;
  });
}


  open(content: any, nombre:string, codigo:string, stock:number, id:string) {
    this.TituloModal = nombre;
    this.CodigoModal = codigo;
    this.stock = stock;
    this.id = id;
    this.modalService.open(content, { centered: true });
  }

  editarStock(){
    
    const almacen: Almacen = {
      stock: this.stock
    }

    console.log(this.id);
    this._almacenService.editarStock(this.id, almacen).subscribe(data => {
      this.toastr.info('El stock fue actualizado con éxito!', 'stock Actualizado!')
      this.obtenerAlmacen();
    }, error => {
      if (error.error && error.error.msg) {
        error.error.msg.forEach((errorMessage: string) => {
          this.toastr.error(errorMessage, 'Error');
        });
      } else {
        console.log(error);
      }
    })
  }


  isLoggedIn: boolean = this.api.isLogged();
  onClickLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
 
}
