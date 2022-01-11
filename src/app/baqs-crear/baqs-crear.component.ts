import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransitionCheckState } from '@angular/material/checkbox';
import { MatTable } from '@angular/material/table';
import { columnasDTO } from '../models/BaqCreacionDTO';

@Component({
  selector: 'app-baqs-crear',
  templateUrl: './baqs-crear.component.html',
  styleUrls: ['./baqs-crear.component.css'],
})
export class BaqsCrearComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  //estasticas
  areas = [
    { id: 1, nombre: 'Finanzas' },
    { id: 2, nombre: 'Producción' },
  ];

  columnas: columnasDTO[] = [];

  columnasTemp = [
    {
      nombreColumna: 'prueba',
      tipo: 'varchar',
      longitud: 12,
      flotantes: 1,
      nulos: false,
    },
  ];

  checked = false;
  tipo = 'varchar';

  tiposDato = ['varchar', 'int', 'decimal', 'bit', 'date', 'datetime'];

  columnasAMostrar = [
    'opciones',
    'nombre',
    'tipo',
    'longitud',
    'flotantes',
    'nulos',
  ];

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.form = this.formBuilder.group({
      nombre: ['', { validators: [Validators.required] }],
      url: ['', { validators: [Validators.required] }],
      idArea: ['', { validators: [Validators.required] }],
      nombreColumna: '',
      tipo: '',
      longitud: '',
      flotantes: '',
      nulos: '',
    });
  }
  prueba() {
    console.log(this.form.value);

    let form = this.form.value;
    let columnasTemp: columnasDTO = {
      nombreColumna: form.nombreColumna,
      tipo: form.tipo,
      longitud: form.longitud,
      flotantes: form.flotantes,
      nulos: form.nulos,
    };

    this.columnas.push(columnasTemp);
    this.table.renderRows();
    this.limpiarFomulario();
  }

  limpiarFomulario() {
    this.form.patchValue({ nombreColumna: null });
    this.form.patchValue({ tipo: null });
    this.form.patchValue({ longitud: null });
    this.form.patchValue({ flotantes: null });
    this.form.patchValue({ nulos: null });
  }

  eliminarElemento(index: number) {
    this.columnas.splice(index, 1);
    this.table.renderRows();
  }
}
