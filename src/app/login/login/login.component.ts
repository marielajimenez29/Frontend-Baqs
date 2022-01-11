import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { loginDTO, respuestaAutenticacionDTO } from '../seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private seguridadService: SeguridadService,
    private router: Router
  ) {}

  form: FormGroup;

  hide = true;
  errores: string[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user: ['', { validators: [Validators.required] }],
      password: ['', { validators: [Validators.required] }],
    });
  }

  login() {
    this.isLoading = true;
    this.seguridadService.login(this.form.value).subscribe(
      (response) => {
        this.seguridadService.guardarToken(response);
        this.isLoading = false;

        this.router.navigate(['/landingPage']);
      },
      (errores) => {
        this.errores = parsearErroresAPI(errores);
        this.isLoading = false;
      }
    );
  }
}
