import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { tareaDTO } from '../tarea';
import { TareasService } from '../tareas.service';

@Component({
  selector: 'app-indice-tareas',
  templateUrl: './indice-tareas.component.html',
  styleUrls: ['./indice-tareas.component.css'],
})
export class IndiceTareasComponent implements OnInit {
  constructor(private tareasService: TareasService) {}

  columnasAMostrar = [
    'nombre',
    'nombreBAQ',
    'ultima_ejecucion',
    'ejecucion',
    'estado',
    'opciones',
  ];

  tareas: tareaDTO[];

  //Paginación
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;
  isLoading = false;
  errores: string[] = [];

  ngOnInit(): void {
    this.cargarRegistrosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  cargarRegistrosPaginacion(pagina: number, cantidadElementosAMostrar) {
    this.isLoading = true;
    this.tareasService
      .obtenerPaginado(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<tareaDTO[]>) => {
          this.tareas = respuesta.body;

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

    this.cargarRegistrosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  eliminar(id: number) {
    this.tareasService.eliminar(id).subscribe(
      () => {
        alert('¡Tarea eliminada!');
        this.cargarRegistrosPaginacion(
          this.paginaActual,
          this.cantidadRegistrosAMostrar
        );
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
      }
    );
  }

  activar(id: number) {
    this.tareasService.activar(id).subscribe(
      () => {
        alert('¡Tarea activada!');
        this.cargarRegistrosPaginacion(
          this.paginaActual,
          this.cantidadRegistrosAMostrar
        );
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }

  desactivar(id: number) {
    this.tareasService.desactivar(id).subscribe(
      () => {
        alert('¡Tarea desactivada!');
        this.cargarRegistrosPaginacion(
          this.paginaActual,
          this.cantidadRegistrosAMostrar
        );
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
