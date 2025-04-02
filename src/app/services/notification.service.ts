import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
 
  getNotifications(){
     return this.http.get<any[]>(`${environment.apiUrl}/notifications`)
   }

   deactivateNotification(id: number){
     return this.http.get<any>(`${environment.apiUrl}/notifications/deactivate/${id}`)
   }
}
