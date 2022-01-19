import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { baqDTO } from 'src/app/baqs/baq';
import { BaqsService } from 'src/app/baqs/baqs.service';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { TareasService } from '../tareas.service';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css'],
})
export class CrearTareaComponent implements OnInit {
  constructor(
    private baqsService: BaqsService,
    private formBuilder: FormBuilder,
    private tareasService: TareasService,
    private router: Router
  ) {}

  form: FormGroup;
  filtros = ['General', 'Mensual', 'Semanal', 'Diario'];

  baqs: baqDTO[];

  errores: string[] = [];

  ngOnInit(): void {
    this.obtenerBAQS();
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.form = this.formBuilder.group({
      nombre: ['', { validators: [Validators.required] }],
      idCabecera: ['', { validators: [Validators.required] }],
      filtro: ['', { validators: [Validators.required] }],
      descripcion: '',
      fecha: ['', { validators: [Validators.required] }],
      hora: ['', { validators: [Validators.required] }],
      intervalo: ['', { validators: [Validators.required] }],
    });
  }
  obtenerBAQS() {
    this.baqsService.obtenerBAQS().subscribe(
      (baqs) => {
        this.baqs = baqs;
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }

  crear() {
    console.log(this.form.value);

    this.tareasService.crear(this.form.value).subscribe(
      () => {
        alert('¡Tarea Creada!');
        this.router.navigate(['/programaciones']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
