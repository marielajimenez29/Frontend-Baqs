import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loginDTO, respuestaAutenticacionDTO } from './seguridad';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  apiURL = environment.apiURL + 'usuarios';

  //llaves localStorage
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly llaveRol = 'rol';

  login(loginUsuario: loginDTO): Observable<respuestaAutenticacionDTO> {
    return this.httpClient.post<respuestaAutenticacionDTO>(
      this.apiURL + '/login',
      loginUsuario
    );
  }

  //Guardadr informacion en localStorage
  guardarToken(respuestaAutenticacion: respuestaAutenticacionDTO) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(
      this.llaveExpiracion,
      respuestaAutenticacion.expiracion.toString()
    );
  }

  obtenerToken() {
    return localStorage.getItem(this.llaveToken);
  }

  obtenerRol(): string {
    return this.obtenerCampoJWT(this.llaveRol);
  }

  public obtenerCampoJWT(campo: string): string {
    const token = localStorage.getItem(this.llaveToken);

    if (!token) {
      return '';
    }

    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }

  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
    this.router.navigate(['/login']); //mandará al login
  }

  estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken);

    if (!token) {
      return false; //No está logueado
    }

    const expiracion = localStorage.getItem(this.llaveExpiracion);
    const expiracionFecha = new Date(expiracion);

    if (expiracionFecha <= new Date()) {
      this.logout();
      return false; //El token caduco, por lo que se borra.
    }

    return true; //el token sigue vigente
  }
}
