import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoResponseDashboard } from '../../domain/dtos/dashboard/DtoResponseDashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<DtoResponseDashboard>(`${environment.apiUrl}/dashboard/list`)
  }
}
