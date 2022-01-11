import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { companiaDTO } from './compania';

@Injectable({
  providedIn: 'root',
})
export class CompaniasService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'companias';

  public getCompanias(): Observable<companiaDTO[]> {
    return this.http.get<companiaDTO[]>(this.apiURL);
  }
}
