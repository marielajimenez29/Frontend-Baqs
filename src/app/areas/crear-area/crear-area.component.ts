import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { areaCreacionDTO } from '../area';
import { AreasService } from '../areas.service';

@Component({
  selector: 'app-crear-area',
  templateUrl: './crear-area.component.html',
  styleUrls: ['./crear-area.component.css'],
})
export class CrearAreaComponent implements OnInit {
  errores: string[] = [];
  constructor(private router: Router, private areasService: AreasService) {}

  ngOnInit(): void {}

  guardarCambios(area: areaCreacionDTO): void {
    this.areasService.crear(area).subscribe(
      () => {
        alert('¡Área Creada!');
        this.router.navigate(['/areas']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
