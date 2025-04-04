import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@/environments/environment.development';
import {DtoResponseRol} from '@/app/domain/dtos/system/rol/DtoResponseRol';
import {DtoRolCreate} from '@/app/domain/dtos/system/rol/DtoRolCreate';
import {DtoRolEdit} from '@/app/domain/dtos/system/rol/DtoRolEdit';
import {ApiResponse} from '@/app/domain/ApiResponse';
import {map, Observable} from 'rxjs';

const BASE = environment;

@Injectable({
  providedIn: 'root'
})
export class RolService {
  constructor(private http: HttpClient) {
  }

  list(): Observable<DtoResponseRol[]> {
    return this.http.get<ApiResponse<DtoResponseRol>>(`${BASE.apiUrl}/Rol/GetRoles`)
      .pipe(
        map(response => response.data)
      );
  }

  store(data: DtoRolCreate) {
    return this.http.post<{ message: string }>(`${BASE.apiUrl}/Rol/CreateRol`, data)
  }

  update(data: DtoRolEdit) {
    return this.http.post<{ message: string }>(`${BASE.apiUrl}/Rol/UpdateRol`, data)
  }

  delete(id: number) {
    return this.http.get<{ message: string }>(`${BASE.apiUrl}/Rol/DeleteRol/${id}`)
  }
}
