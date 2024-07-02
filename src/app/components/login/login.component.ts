
import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup, FormControl, Validators, FormGroupDirective,
} from '@angular/forms';
import { LoginService } from '../../../app/services/login.service';
import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { response } from 'express';
import { Token } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  constructor(private api: LoginService, 
              private router: Router,
              private toastr: ToastrService) { }

  errorStatus: boolean = false;
  errorMsg: any = '';

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (localStorage.getItem('token')) {
      this.checkRole(localStorage.getItem('rol'));
    }
  }

  checkRole(role: string | null) {
    if (Number(role) == 1) {
      this.router.navigate(['dashboard-gerente']);
    }
    else if (Number(role) == 2) {
      this.router.navigate(['dashboard-trabajador']);
    }
  }

  onLogin(form: LoginI) {
    this.api.loginByEmail(form).subscribe({
      next: (response: any) => {
        let dataResponse: ResponseI = response;
        //console.log(dataResponse);
        if (dataResponse.ok == true) {
          const token = dataResponse.body.token;
          const rol = dataResponse.body.role;
          localStorage.setItem('token', token);
          localStorage.setItem('rol', rol);
          this.checkRole(rol);
          this.toastr.success('Bienvenido', '¡Inicio de sesión exitoso!');
        }
      },
      error: (error: any) => {
        let msg = error.error;
        if (msg.message) {
          this.toastr.error(msg.message, '¡Error al iniciar sesión!');
        } else if (msg.error) {
          this.toastr.error(msg.error[0], '¡Error al iniciar sesión!');
        }
      },
    });
  }
}

