import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  usuarioActualizarDTO,
  usuarioCreacionDTO,
  usuarioDTO,
} from './usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'usuarios';

  public obtenerTodos() {
    return this.http.get<usuarioDTO[]>(`${this.apiURL}/getUsuarios`);
  }

  public obtenerPorId(id: number): Observable<usuarioDTO> {
    return this.http.get<usuarioDTO>(`${this.apiURL}/${id}`);
  }

  public crear(usuario: usuarioCreacionDTO) {
    return this.http.post(`${this.apiURL}/insertar`, usuario);
  }

  public modificar(id: number, usuario: usuarioActualizarDTO) {
    return this.http.put(`${this.apiURL}/modificar/${id}`, usuario);
  }

  public activar(id: number) {
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }

  public desactivar(id: number) {
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }
}
