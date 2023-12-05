import { Component, OnInit } from '@angular/core';
import { SecretAngelService } from '../service/secret-angel.service';
import { Angel } from '../model/angel.interface';
import { db } from '../db/angel.db';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-secret-angel',
  templateUrl: './secret-angel.component.html',
  styleUrls: ['./secret-angel.component.css']
})
export class SecretAngelComponent implements OnInit {

  angels: Angel[] = [] as Angel[];
  codeSecret: string = '';
  myNameAngel: string = '';

  constructor() {}

  ngOnInit() {
    this.angels = db;    
    console.log(this.angels);
    
  }

  getMyAngelSecret() {
    if (this.validateCodeAndNameSecret()) {
      const angel = this.angels.find(angel => angel.code === this.codeSecret);
      if (angel && !angel.availability) {
        Swal.fire({
          title: '¡Angelito ya seleccionado!',
          text: 'El Angelito con este código ya ha sido seleccionado anteriormente',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        });
        return;
      } else if (angel && angel.availability) {
        angel.availability = false;
        this.codeSecret = '';
        this.myNameAngel = '';
        Swal.fire({
          title: '¡Angelito encontrado!',
          text: 'Tu Angelito es: ' + angel.nameReal,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        return;   
      } else {
        Swal.fire({
          title: '¡Error!',
          text: 'Hubo un error inesperado. Por favor, inténtalo de nuevo',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }    
    console.log(this.angels);
    
  }



  validateCodeAndNameSecret(): boolean {
    if (this.codeSecret === '') {
      Swal.fire({
        title: '¡Código Incorrecto!',
        text: 'Debes ingresar un código secreto',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
      return false;
    } else if (this.codeSecret.length < 6 || this.codeSecret.length > 6) {
      Swal.fire({
        title: '¡Código Incorrecto!',
        text: 'El código secreto debe tener 6 letras o numeros',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
      return false;
    } else if (this.angels.find(angel => angel.code === this.codeSecret) === undefined) {
      Swal.fire({
        title: '¡Código Incorrecto!',
        text: 'El código secreto no existe',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
      return false;      
    } else if (this.myNameAngel === '') {
      Swal.fire({
        title: '¡Nombre Incorrecto!',
        text: 'Debes ingresar tu nombre',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
      return false;
    } else if (!/^[a-zA-Z0-9]+$/.test(this.myNameAngel)) {
      Swal.fire({
        title: '¡Nombre Incorrecto!',
        text: 'Tu nombre solo debe contener letras y números',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
      return false;
    } else if (this.myNameAngel.length < 3 || this.myNameAngel.length > 30) {
      Swal.fire({
        title: '¡Nombre Incorrecto!',
        text: 'Tu nombre debe tener entre 3 y 30 caracteres',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
      return false;
    } else if (this.angels.find(angel => angel.names.includes(this.myNameAngel) && angel.code === this.codeSecret) !== undefined) {
      Swal.fire({
        title: '¡¡¡Oops!!!',
        text: 'Que tal si pruebas otro código 😉',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
      return false;
    } 


    return true;
  }
}
