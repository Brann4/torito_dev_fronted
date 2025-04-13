import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment.development';
import { DtoResponseRol } from '@/app/domain/dtos/system/rol/DtoResponseRol';
import { DtoRolCreate } from '@/app/domain/dtos/system/rol/DtoRolCreate';
import { DtoRolEdit } from '@/app/domain/dtos/system/rol/DtoRolEdit';
import { ApiResponse, ApiResponseSingle } from '@/app/domain/ApiResponse';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  constructor(private http: HttpClient) {
  }

  list(): Observable<DtoResponseRol[]> {
    return this.http.get<ApiResponse<DtoResponseRol>>(`${environment.apiUrl}/Rol/GetRoles`)
      .pipe(
        map(response => response.data)
      );
  }

  getById(id: number) : Observable<DtoResponseRol> {
    return this.http.get<ApiResponseSingle<DtoResponseRol>>(`${environment.apiUrl}/Rol/GetRolById/${id}`)
    .pipe(
      map((response) =>  response.data)
    );
  }

  store(data: DtoRolCreate) {
    return this.http.post<{ message: string }>(`${environment.apiUrl}/Rol/CreateRol`, data)
  }

  update(data: DtoRolEdit) {
    return this.http.post<{ message: string }>(`${environment.apiUrl}/Rol/UpdateRol`, data)
  }

  delete(id: number) {
    return this.http.get<{ message: string }>(`${environment.apiUrl}/Rol/DeleteRol/${id}`)
  }
}
