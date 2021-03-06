import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { areaDTO } from '../area';
import { AreasService } from '../areas.service';

@Component({
  selector: 'app-indice-areas',
  templateUrl: './indice-areas.component.html',
  styleUrls: ['./indice-areas.component.css'],
})
export class IndiceAreasComponent implements OnInit {
  constructor(private areasService: AreasService) {}

  columnasAMostrar = ['nombre', 'estado', 'opciones'];
  areas: areaDTO[];

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
    this.areasService
      .obtenerPaginado(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<areaDTO[]>) => {
          this.areas = respuesta.body;

          this.cantidadTotalRegistros = respuesta.headers.get(
            'cantidadTotalRegistros'
          );
          console.log(respuesta.body);

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

  activar(id: number) {
    this.areasService.activar(id).subscribe(
      () => {
        alert('¡Área activada!');
        this.cargarRegistrosPaginacion(
          this.paginaActual,
          this.cantidadRegistrosAMostrar
        );
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }

  desactivar(id: number) {
    this.areasService.desactivar(id).subscribe(
      () => {
        alert('¡Área desactivada!');
        this.cargarRegistrosPaginacion(
          this.paginaActual,
          this.cantidadRegistrosAMostrar
        );
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
