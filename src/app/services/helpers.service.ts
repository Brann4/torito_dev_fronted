import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';



type ToastParams = {
  severity: string,
  summary: string,
  detail: string
}

@Injectable({
  providedIn: 'root',
})
export class HelpersService {

  constructor(
    private messageService : MessageService,
    private http: HttpClient
  ) {}

  showToast(params:ToastParams){
    this.messageService.add(params)
  }

  searchByDNI(dni : string){
    return this.http.post<{apemat : string , apepat : string , nombres : string}>(`${environment.apiUrl}/helpers/buscar-dni`, {dni})
  }
  searchByRUC(ruc : string){
    return this.http.post<{legal_name : string }>(`${environment.apiUrl}/helpers/buscar-ruc`, {ruc})
  }
  generateSlug(text : string){
    return this.http.post<string>(`${environment.apiUrl}/helpers/generate-slug`, {text})
  }
}
