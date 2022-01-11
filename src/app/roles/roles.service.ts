import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { rolDTO } from './rol';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'roles';

  public getRoles(): Observable<rolDTO[]> {
    return this.http.get<rolDTO[]>(this.apiURL);
  }
}
