import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { baqDTO } from 'src/app/baqs/baq';
import { BaqsService } from 'src/app/baqs/baqs.service';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { tareaEditarDTO } from '../tarea';
import { TareasService } from '../tareas.service';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css'],
})
export class EditarTareaComponent implements OnInit {
  constructor(
    private tareasService: TareasService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private baqsService: BaqsService
  ) {}

  form: FormGroup;

  tarea: tareaEditarDTO;
  errores: string[] = [];
  baqs: baqDTO[];

  filtros = ['General', 'Mensual', 'Semanal', 'Diario'];
  ngOnInit(): void {
    this.obtenerBAQS();
    this.cargarFormulario();
    this.activatedRoute.params.subscribe((params) => {
      this.tareasService.obtenerPorId(params.id).subscribe(
        (tarea) => {
          this.tarea = tarea;

          this.form.patchValue(tarea);
        },
        () => this.router.navigate(['/programaciones'])
      );
    });
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
    this.tareasService.editar(this.tarea.idTarea, this.form.value).subscribe(
      () => {
        alert('¡Tarea actualizada!');
        this.router.navigate(['/programaciones']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
