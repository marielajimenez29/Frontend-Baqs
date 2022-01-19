import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { areaCreacionDTO } from '../area';

@Component({
  selector: 'app-formulario-area',
  templateUrl: './formulario-area.component.html',
  styleUrls: ['./formulario-area.component.css'],
})
export class FormularioAreaComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  @Input()
  modelo: areaCreacionDTO;

  @Input()
  errores: string[] = [];

  @Output()
  onSubmit: EventEmitter<areaCreacionDTO> = new EventEmitter<areaCreacionDTO>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required, Validators.minLength(3)],
        },
      ],
    });

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  guardarCambios() {
    this.onSubmit.emit(this.form.value);
  }
}
