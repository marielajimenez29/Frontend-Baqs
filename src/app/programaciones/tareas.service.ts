import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tareaCreacionDTO, tareaDTO, tareaEditarDTO } from './tarea';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'tareas';

  public crear(tarea: tareaCreacionDTO) {
    return this.http.post(this.apiURL + '/crear', tarea);
  }

  public obtenerPaginado(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<tareaDTO[]>(this.apiURL + '/tareasPaginacion', {
      observe: 'response',
      params,
    });
  }

  public editar(id: number, tarea: tareaCreacionDTO) {
    return this.http.put(`${this.apiURL}/editar/${id}`, tarea);
  }

  public eliminar(id: number) {
    return this.http.delete(`${this.apiURL}/eliminar/${id}`);
  }

  public obtenerPorId(id: number): Observable<tareaEditarDTO> {
    return this.http.get<tareaEditarDTO>(`${this.apiURL}/${id}`);
  }

  public activar(id: number) {
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }
  public desactivar(id: number) {
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }
}
