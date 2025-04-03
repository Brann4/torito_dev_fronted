import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@/environments/environment.development';
import {
  DtoResponseEstadoWalletDetalle
} from '@/app/domain/dtos/system/estado-wallet-detalle/DtoResponseEstadoWalletDetalle';
import {
  DtoEstadoWalletDetalleCreate
} from '@/app/domain/dtos/system/estado-wallet-detalle/DtoEstadoWalletDetalleCreate';
import {DtoEstadoWalletDetalleEdit} from '@/app/domain/dtos/system/estado-wallet-detalle/DtoEstadoWalletDetalleEdit';
import {map, Observable} from 'rxjs';

const BASE = environment;

@Injectable({
  providedIn: 'root'
})
export class EstadoWalletDetalleService {
  constructor(private http: HttpClient) {
  }

  list(): Observable<DtoResponseEstadoWalletDetalle[]> {
    return this.http.get<{
      sucess: boolean,
      message: string,
      data: DtoResponseEstadoWalletDetalle[]
    }>(`${BASE.apiUrl}/EstadoWalletDetalle/GetEstadosWalletDetalle`)
      .pipe(
        map(response => response.data)
      );
  }

  store(data: DtoEstadoWalletDetalleCreate) {
    return this.http.post<{ message: string }>(`${BASE.apiUrl}/EstadoWalletDetalle/CreateEstadoWalletDetalle`, data)
  }

  update(data: DtoEstadoWalletDetalleEdit) {
    return this.http.post<{ message: string }>(`${BASE.apiUrl}/EstadoWalletDetalle/UpdateEstadoWalletDetalle`, data)
  }

  delete(id: number) {
    return this.http.post<{ message: string }>(`${BASE.apiUrl}/EstadoWalletDetalle/DeleteEstadoWalletDetalle/`, {id})
  }
}
