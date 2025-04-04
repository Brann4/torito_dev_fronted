import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@/environments/environment.development';
import {DtoResponseEntidadFinanciera} from '@/app/domain/dtos/system/entidad-financiera/DtoResponseEntidadFinanciera';
import {DtoEntidadFinancieraCreate} from '@/app/domain/dtos/system/entidad-financiera/DtoEntidadFinancieraCreate';
import {DtoEntidadFinancieraEdit} from '@/app/domain/dtos/system/entidad-financiera/DtoEntidadFinancieraEdit';
import {map, Observable} from 'rxjs';
import { ApiResponse } from '@/app/domain/ApiResponse';

const BASE = environment;

@Injectable({
  providedIn: 'root'
})
export class EntidadFinancieraService {
  constructor(private http: HttpClient) {
  }

  list(): Observable<DtoResponseEntidadFinanciera[]> {
    return this.http.get<ApiResponse<DtoResponseEntidadFinanciera>>(`${BASE.apiUrl}/EntidadFinanciera/GetEntidadesFinancieras`)
      .pipe(
        map(response => response.data)
      );
  }

  store(data: FormData) {
    return this.http.post<{ message: string }>(`${BASE.apiUrl}/EntidadFinanciera/CreateEntidadFinanciera`, data)
  }

  update(data: FormData) {
    return this.http.post<{ message: string }>(`${BASE.apiUrl}/EntidadFinanciera/UpdateEntidadFinanciera`, data)
  }

  delete(id: number) {
    return this.http.delete<{ message: string }>(`${BASE.apiUrl}/EntidadFinanciera/DeleteEntidadFinanciera/${id}`)
  }
}
