import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { DtoResponseUser } from '@/app/domain/dtos/system/user/DtoResponseUser';
import { DtoUserCreate } from '@/app/domain/dtos/system/user/DtoUserCreate';
import { DtoUserEdit } from '@/app/domain/dtos/system/user/DtoUserEdit';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }
  
  list(){
    return this.http.get<DtoResponseUser[]>(`${environment.apiUrl}/users/list`)
  }

  store(values : DtoUserCreate){
    return this.http.post<{message : string}>(`${environment.apiUrl}/users/store`, values)
  }

  update(values : DtoUserEdit){
    return this.http.put<{message : string}>(`${environment.apiUrl}/users/update`, values)
  }

  delete(id : number){
    return this.http.put<{message : string}>(`${environment.apiUrl}/users/delete`, { id })
  }

  updatePassword(values : any){
    return this.http.put<{message : string}>(`${environment.apiUrl}/users/update-password`, values)
  }
}
