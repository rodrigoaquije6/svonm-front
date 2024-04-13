// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {

// }
import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { LoginService } from '../../../app/services/login.service';
import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { response } from 'express';
import { Token } from '@angular/compiler';

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

  constructor(private api: LoginService, private router: Router) {}

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
    if(Number(role) == 1){
      this.router.navigate(['dashboard-gerente']);
    }
    else if(Number(role) == 2){
      this.router.navigate(['']);
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
        }
      },
      error: (error: any) => {
        //console.log(error);
        this.errorStatus = true;
        let msg = error.error;
        if (msg.message) {
          this.errorMsg = msg.message;
        } else if (msg.error) {
          this.errorMsg = msg.error[0];
        }
      },
    });
  }
}

