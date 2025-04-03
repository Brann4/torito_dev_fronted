import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@/environments/environment.development';
import {DtoResponseTipoCuenta} from '@/app/domain/dtos/system/tipo-cuenta/DtoResponseTipoCuenta';
import {DtoTipoCuentaCreate} from '@/app/domain/dtos/system/tipo-cuenta/DtoTipoCuentaCreate';
import {DtoTipoCuentaEdit} from '@/app/domain/dtos/system/tipo-cuenta/DtoTipoCuentaEdit';
import {ApiResponse} from '@/app/domain/ApiResponse';
import {map, Observable} from 'rxjs';

const BASE = environment;

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {
  constructor(private http: HttpClient) {
  }

  list(): Observable<DtoResponseTipoCuenta[]> {
    return this.http.get<ApiResponse<DtoResponseTipoCuenta>>(`${BASE.apiUrl}/TipoCuenta/GetTiposCuenta`)
      .pipe(
        map(response => response.data)
      );
  }

  store(data: DtoTipoCuentaCreate) {
    return this.http.post<{ message: string }>(`${BASE.apiUrl}/TipoCuenta/CreateTipoCuenta`, data)
  }

  update(data: DtoTipoCuentaEdit) {
    return this.http.post<{ message: string }>(`${BASE.apiUrl}/TipoCuenta/UpdateTipoCuenta`, data)
  }

  delete(id: number) {
    return this.http.get<{ message: string }>(`${BASE.apiUrl}/TipoCuenta/DeleteTipoCuenta/${id}`)
  }
}
