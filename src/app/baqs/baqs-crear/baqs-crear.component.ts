import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { areaDTO } from 'src/app/areas/area';
import { AreasService } from 'src/app/areas/areas.service';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { baqCreacionDTO, columnasDTO } from '../baq';
import { BaqsService } from '../baqs.service';

@Component({
  selector: 'app-baqs-crear',
  templateUrl: './baqs-crear.component.html',
  styleUrls: ['./baqs-crear.component.css'],
})
export class BaqsCrearComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private areasService: AreasService,
    private baqsService: BaqsService,
    private router: Router
  ) {}

  form: FormGroup;

  //estasticas
  areas: areaDTO[];

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

  errores: string[] = [];
  isLoading = false;

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.cargarFormulario();
    this.cargarAreas();
  }

  cargarFormulario() {
    this.form = this.formBuilder.group({
      nombre: ['', { validators: [Validators.required] }],
      url: ['', { validators: [Validators.required] }],
      idArea: ['', { validators: [Validators.required] }],
      nombreColumna: '',
      tipo: 'varchar',
      longitud: 0,
      flotantes: 0,
      nulos: false,
    });
  }
  agregarColumna() {
    let longitud =
      this.form.value.longitud === undefined
        ? 0
        : this.form.value.longitud === null
        ? 0
        : this.form.value.longitud;

    let flotantes =
      this.form.value.flotantes === undefined
        ? 0
        : this.form.value.flotantes === null
        ? 0
        : this.form.value.flotantes;

    console.log('Logitud ' + longitud + ' Flotantes ' + flotantes);

    let columnasTemp: columnasDTO = {
      nombreColumna: this.form.value.nombreColumna,
      tipo: this.form.value.tipo,
      // longitud: this.form.value.longitud,
      // flotantes: this.form.value.flotantes,
      longitud: longitud,
      flotantes: flotantes,
      nulos: this.form.value.nulos,
    };

    this.columnas.push(columnasTemp);
    this.table.renderRows(); //Refresca tabla para que se muestre actualizada
    this.limpiarFomulario();
  }

  limpiarFomulario() {
    this.form.patchValue({ nombreColumna: null });
    this.form.patchValue({ tipo: null });
    this.form.patchValue({ longitud: null });
    this.form.patchValue({ flotantes: null });
    this.form.patchValue({ nulos: false });
  }

  eliminarElemento(index: number) {
    this.columnas.splice(index, 1);
    this.table.renderRows();
  }
  verificarCampos() {
    let tipo = this.form.value.tipo;

    switch (tipo) {
      case 'varchar':
        this.form.get('longitud').enable();
        this.form.get('flotantes').disable();
        break;
      case 'int':
      case 'bit':
      case 'date':
      case 'datetime':
        this.form.get('longitud').disable();
        this.form.get('flotantes').disable();
        break;
      case 'decimal':
        this.form.get('longitud').enable();
        this.form.get('flotantes').enable();
        break;

      default:
        break;
    }
  }

  cargarAreas() {
    this.isLoading = true;
    this.areasService.obtenerTodos().subscribe(
      (areas) => {
        this.areas = areas;
        this.isLoading = false;
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        this.isLoading = false;
        //
      }
    );
  }

  crearTabla() {
    this.isLoading = true;
    //crear cabecera
    let baqCreacionDTO: baqCreacionDTO = {
      idArea: this.form.value.idArea,
      nombre: this.form.value.nombre,
      _url: this.form.value.url,

      columnas: this.columnas,
    };

    console.log(baqCreacionDTO);

    this.baqsService.crear(baqCreacionDTO).subscribe(
      () => {
        this.isLoading = false;
        alert('??Tabla creada correctamente!');
        this.router.navigate(['baqs']);
      },
      (errores) => {
        this.errores = parsearErroresAPI(errores);
        this.isLoading = false;
      }
    );
  }
}
