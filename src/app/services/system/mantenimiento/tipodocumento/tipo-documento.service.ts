import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {environment} from '@/environments/environment.development';
import {DtoResponseTipoDocumento} from '@/app/domain/dtos/system/tipo-documento/DtoResponseTipoDocumento';
import {DtoTipoDocumentoCreate} from '@/app/domain/dtos/system/tipo-documento/DtoTipoDocumentoCreate';
import {DtoTipoDocumentoEdit} from '@/app/domain/dtos/system/tipo-documento/DtoTipoDocumentoEdit';
import {map, Observable} from 'rxjs';

const BASE = environment;

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  constructor(private http: HttpClient) {
  }

  list(): Observable<DtoResponseTipoDocumento[]> {
    return this.http.get<{
      sucess: boolean,
      message: string,
      data: DtoResponseTipoDocumento[]
    }>(`${BASE.apiUrl}/TipoDocumento/GetTiposDocumento`)
      .pipe(
        map(response => response.data)
      );
  }

  store(data: DtoTipoDocumentoCreate) {
    return this.http.post<{ message: string }>(`${BASE.apiUrl}/TipoDocumento/CreateTipoDocumento`, data)
  }

  update(data: DtoTipoDocumentoEdit) {
    return this.http.post<{ message: string }>(`${BASE.apiUrl}/TipoDocumento/UpdateTipoDocumento`, data)
  }

  delete(id: number) {
    return this.http.post<{ message: string }>(`${BASE.apiUrl}/TipoDocumento/DeleteTipoDocumento/`, {id})
  }
}
