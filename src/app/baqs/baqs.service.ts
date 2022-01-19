import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isThisTypeNode } from 'typescript';
import { baqCreacionDTO, baqDTO } from './baq';

@Injectable({
  providedIn: 'root',
})
export class BaqsService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'baqs';

  public crear(baqs: baqCreacionDTO) {
    return this.http.post(`${this.apiURL}/crear`, baqs);
  }

  public obtenerBAQS() {
    return this.http.get<baqDTO[]>(`${this.apiURL}/obtenerBAQS`);
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

    return this.http.get<baqDTO[]>(this.apiURL + '/baqsPaginacion', {
      observe: 'response',
      params,
    });
  }
}
