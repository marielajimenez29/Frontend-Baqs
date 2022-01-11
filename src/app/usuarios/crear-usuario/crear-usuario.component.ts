import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { companiaDTO } from 'src/app/companias/compania';
import { CompaniasService } from 'src/app/companias/companias.service';
import { rolDTO } from 'src/app/roles/rol';
import { RolesService } from 'src/app/roles/roles.service';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  roles: rolDTO[];
  companias: companiaDTO[];

  constructor(
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
    private companiasService: CompaniasService,
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idRol: ['', { validators: [Validators.required] }],
      idCompania: ['', { validators: [Validators.required] }],
      nombre: ['', { validators: [Validators.required] }],
      email: ['', { validators: [Validators.required, Validators.email] }],
      _Password: ['', { validators: [Validators.required] }],
    });

    this.getRoles();
    this.getCompanias();
  }

  getRoles() {
    this.rolesService.getRoles().subscribe(
      (roles) => {
        this.roles = roles;
        console.log(this.roles);
      },
      (error) => console.log(error)
    );
  }

  getCompanias() {
    this.companiasService.getCompanias().subscribe(
      (companias) => {
        this.companias = companias;
      },
      (error) => console.log(error)
    );
  }

  guardarUsuario() {
    this.usuariosService.crear(this.form.value).subscribe(
      () => {
        alert('¡Usuario Agregado!');
        this.router.navigate(['/usuarios']);
      },
      (error) => {
        alert(error.error);
        console.log(error.error);
      }
    );
  }
}
