import { Component, OnInit } from '@angular/core';

declare var bootstrap: any; // Declarar la variable bootstrap

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
    // Inicializar los modales de Bootstrap
    document.addEventListener('DOMContentLoaded', function () {
      var modals = document.querySelectorAll('.modal');
      bootstrap.Modal.init(modals);
    });
    
  }

}
