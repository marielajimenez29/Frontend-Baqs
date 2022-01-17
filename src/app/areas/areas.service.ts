import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { areaCreacionDTO, areaDTO } from './area';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'areas';

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

    return this.http.get<areaDTO[]>(this.apiURL + '/todasPaginacion', {
      observe: 'response',
      params,
    });
  }

  public obtenerTodos() {
    return this.http.get<areaDTO[]>(`${this.apiURL}/todas`);
  }
  public obtenerPorId(id: number): Observable<areaDTO> {
    return this.http.get<areaDTO>(`${this.apiURL}/${id}`);
  }

  public crear(area: areaCreacionDTO) {
    return this.http.post(this.apiURL + '/crear', area);
  }

  public editar(id: number, area: areaCreacionDTO) {
    return this.http.put(`${this.apiURL}/editar/${id}`, area);
  }

  public activar(id: number) {
    return this.http.put(`${this.apiURL}/activar/${id}`, null);
  }
  public desactivar(id: number) {
    return this.http.put(`${this.apiURL}/desactivar/${id}`, null);
  }
}
