import { DtoResponseTipoDocumento } from '@/app/domain/dtos/system/tipo-documento/DtoResponseTipoDocumento';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@/environments/environment.development';
import {DtoTipoDocumentoCreate} from '@/app/domain/dtos/system/tipo-documento/DtoTipoDocumentoCreate';
import {DtoTipoDocumentoEdit} from '@/app/domain/dtos/system/tipo-documento/DtoTipoDocumentoEdit';
import {ApiResponse} from '@/app/domain/ApiResponse';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  constructor(private http: HttpClient) {
  }

  list() {
    return this.http.get<ApiResponse<DtoResponseTipoDocumento>>(`${environment.apiUrl}/TipoDocumento/GetTiposDocumento`)
      .pipe(
        map(response => response.data)
      );
  }

  getById(id:number) {
    return this.http.get<ApiResponse<DtoResponseTipoDocumento>>(`${environment.apiUrl}/TipoDocumento/GetTipoDocumentoById/${id}`)
    .pipe(
      map(response => response.data)
    );
  }

  store(data: DtoTipoDocumentoCreate) {
    return this.http.post<{ message: string }>(`${environment.apiUrl}/TipoDocumento/CreateTipoDocumento`, data)
  }

  update(data: DtoTipoDocumentoEdit) {
    return this.http.post<{ message: string }>(`${environment.apiUrl}/TipoDocumento/UpdateTipoDocumento`, data)
  }

  delete(id: number) {
    return this.http.get<{ message: string }>(`${environment.apiUrl}/TipoDocumento/DeleteTipoDocumento/${id}`,)
  }
}
