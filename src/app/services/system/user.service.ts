import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DtoResponseUser } from '@/app/domain/dtos/system/user/DtoResponseUser';
import { DtoUserCreate } from '@/app/domain/dtos/system/user/DtoUserCreate';
import { DtoUserEdit } from '@/app/domain/dtos/system/user/DtoUserEdit';
import { ApiResponse, ApiResponseSingle } from '@/app/domain/ApiResponse';
import { UserEntity } from '@/app/domain/entities/UserEntity';
import { map, Observable } from 'rxjs';
import { environment } from '@/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }


    list(): Observable<DtoResponseUser[]> {
      return this.http.get<ApiResponse<DtoResponseUser>>(`${environment.apiUrl}/Usuario/GetUsuarios`)
        .pipe(
          map(response => response.data)
        );
    }

  getById(id : number){
    return this.http.get<ApiResponseSingle<UserEntity>>(`${environment.apiUrl}/Usuario/GetUsuarioById/${id}`)
  }

  store(values : DtoUserCreate){
    return this.http.post<{message : string}>(`${environment.apiUrl}/Usuario/CreateUsuario`, values)
  }

  update(values : DtoUserEdit){
    return this.http.post<{message : string}>(`${environment.apiUrl}/Usuario/UpdateUsuario`, values)
  }

  delete(id : number){
    return this.http.delete<{message : string}>(`${environment.apiUrl}/Usuario/DeleteUsuari/${id}`)
  }
/*
  updatePassword(values : any){
    return this.http.put<{message : string}>(`${environment.apiUrl}/Usuario/update-password`, values)
  }*/
}
