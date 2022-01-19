import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { areaCreacionDTO, areaDTO } from '../area';
import { AreasService } from '../areas.service';

@Component({
  selector: 'app-editar-area',
  templateUrl: './editar-area.component.html',
  styleUrls: ['./editar-area.component.css'],
})
export class EditarAreaComponent implements OnInit {
  constructor(
    private router: Router,
    private areasService: AreasService,
    private activatedRoute: ActivatedRoute
  ) {}

  modelo: areaDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.areasService.obtenerPorId(params.id).subscribe(
        (area) => {
          this.modelo = area;
        },
        () => this.router.navigate(['/areas'])
      );
    });
  }

  guardarCambios(area: areaCreacionDTO) {
    this.areasService.editar(this.modelo.idArea, area).subscribe(
      () => {
        alert('¡Área Actualizada!');

        this.router.navigate(['/areas']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
