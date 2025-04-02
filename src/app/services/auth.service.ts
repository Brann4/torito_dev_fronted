
import { inject, Injectable, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { environment } from "@/environments/environment";
import { AuthStore } from "@/stores/AuthStore";
import { DtoResponseJWT } from "../domain/dtos/DtoResponseJWT";

@Injectable({ providedIn: 'root' })
export class AuthService implements OnInit {

  authStore = inject(AuthStore)
  http = inject(HttpClient)
  router = inject(Router)


  constructor() {
    this.authStore.updateIsAuthenticated(this.authStore.isLoggedIn());
  }
  
  ngOnInit() {
    if (this.authStore.isLoggedIn()) {
      const user = this.authStore.getUserAuthenticated();
      console.log('Usuario autenticado:', user);
    }
  }

  login(credentials :{email: string, password: string}) {
    return this.http.post<DtoResponseJWT>(`${environment.apiUrl}/auth/login`, credentials)
  }

  logout() {
    this.authStore.removeJWT()
    this.authStore.removePermissions()
    this.authStore.updateIsAuthenticated(this.authStore.isLoggedIn())
    this.router.navigate([''],{replaceUrl:true})
  }
}
