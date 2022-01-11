import { Component, OnInit } from '@angular/core';
import { usuarioDTO } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent implements OnInit {
  constructor(private usuariosService: UsuariosService) {}
  usuarios: usuarioDTO[];

  columnasAMostrar = [
    'idUsuario',
    'nombre',
    'email',
    'rol',
    'compania',
    'estado',
    'opciones',
  ];

  ngOnInit(): void {
    //carga las cosas cuando se inicia
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.obtenerTodos().subscribe(
      (response) => {
        this.usuarios = response;
      },
      (error) => console.log('Error ' + error)
    );
  }

  activar(id: number) {
    this.usuariosService.activar(id).subscribe(
      () => {
        alert('¡Usuario Activado!');
        this.cargarUsuarios();
      },
      (error) => alert(error.error)
    );
  }

  desactivar(id: number) {
    this.usuariosService.desactivar(id).subscribe(
      () => {
        alert('¡Usuario Desactivado!');
        this.cargarUsuarios();
      },
      (error) => alert(error.error)
    );
  }
}
