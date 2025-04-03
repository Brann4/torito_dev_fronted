import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//import { environment } from '@/environments/environment';
import { environment } from '@/environments/environment.development';
import { DtoUbigeoCreate } from '@/app/domain/dtos/system/ubigeo/DtoUbigeoCreate';
import { DtoUbigeoEdit } from '@/app/domain/dtos/system/ubigeo/DtoUbigeoEdit';
import { DtoResponseUbigeo } from '@/app/domain/dtos/system/ubigeo/DtoResponseUbigeo';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '@/app/domain/ApiResponse';

const BASE  = environment;

@Injectable({
  providedIn: 'root',
})
export class UbigeoService {
  constructor(private http: HttpClient) {}


  list(): Observable<DtoResponseUbigeo[]> {
    return this.http.get<ApiResponse<DtoResponseUbigeo>>(`${BASE.apiUrl}/Ubigeo/GetUbigeos`)
      .pipe(
        map(response => response.data)
      );
  }

   store(data : DtoUbigeoCreate){
      return this.http.post<{message : string}>(`${BASE.apiUrl}/Ubigeo/CreateUbigeo`, data)
    }
  
    update(data : DtoUbigeoEdit){
      return this.http.post<{message : string}>(`${BASE.apiUrl}/Ubigeo/UpdateUbigeo`, data)
    }
  
    delete(id : number){
      return this.http.get<{message : string}>(`${BASE.apiUrl}/Ubigeo/DeleteUbigeo/${id}`)
    }

}
