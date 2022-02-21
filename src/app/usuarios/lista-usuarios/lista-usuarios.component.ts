import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
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
  isLoading = false;
  //Paginación
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  errores: string[] = [];

  ngOnInit(): void {
    //carga las cosas cuando se inicia
    this.cargarUsuariosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  cargarUsuariosPaginacion(pagina: number, cantidadElementosAMostrar) {
    this.isLoading = true;
    this.usuariosService
      .obtenerPaginado(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<usuarioDTO[]>) => {
          this.usuarios = respuesta.body;

          this.cantidadTotalRegistros = respuesta.headers.get(
            'cantidadTotalRegistros'
          );

          this.isLoading = false;
        },
        (error) => {
          this.errores = parsearErroresAPI(error);
          this.isLoading = false;
        }
      );
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;

    this.cargarUsuariosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  activar(id: number) {
    this.usuariosService.activar(id).subscribe(
      () => {
        alert('¡Usuario Activado!');
        this.cargarUsuariosPaginacion(
          this.paginaActual,
          this.cantidadRegistrosAMostrar
        );
      },
      (error) => alert(error.error)
    );
  }

  desactivar(id: number) {
    this.usuariosService.desactivar(id).subscribe(
      () => {
        alert('¡Usuario Desactivado!');
        this.cargarUsuariosPaginacion(
          this.paginaActual,
          this.cantidadRegistrosAMostrar
        );
      },
      (error) => alert(error.error)
    );
  }

  eliminar(id: number) {
    this.usuariosService.eliminar(id).subscribe(
      () => {
        alert('¡Usuario Eliminado!');
        this.cargarUsuariosPaginacion(
          this.paginaActual,
          this.cantidadRegistrosAMostrar
        );
      },
      (error) => alert(error.error)
    );
  }
}
