import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@/environments/environment.development';
import {
  DtoResponseEstadoConfirmacion
} from '@/app/domain/dtos/system/estado-confirmacion/DtoResponseEstadoConfirmacion';
import {DtoEstadoConfirmacionCreate} from '@/app/domain/dtos/system/estado-confirmacion/DtoEstadoConfirmacionCreate';
import {DtoEstadoConfirmacionEdit} from '@/app/domain/dtos/system/estado-confirmacion/DtoEstadoConfirmacionEdit';
import {ApiResponse} from '@/app/domain/ApiResponse';
import {map, Observable} from 'rxjs';

const BASE = environment;

@Injectable({
  providedIn: 'root'
})
export class EstadoConfirmacionService {
  constructor(private http: HttpClient) {
  }

  list(): Observable<DtoResponseEstadoConfirmacion[]> {
    return this.http.get<ApiResponse<DtoResponseEstadoConfirmacion>>(`${BASE.apiUrl}/EstadoConfirmacion/GetEstadosConfirmacion`)
      .pipe(
        map(response => response.data)
      );
  }

  store(data: DtoEstadoConfirmacionCreate) {
    return this.http.post<{ message: string }>(`${BASE.apiUrl}/EstadoConfirmacion/CreateEstadoConfirmacion`, data)
  }

  update(data: DtoEstadoConfirmacionEdit) {
    return this.http.post<{ message: string }>(`${BASE.apiUrl}/EstadoConfirmacion/UpdateEstadoConfirmacion`, data)
  }

  delete(id: number) {
    return this.http.get<{ message: string }>(`${BASE.apiUrl}/EstadoConfirmacion/DeleteEstadoConfirmacion/${id}`)
  }
}
