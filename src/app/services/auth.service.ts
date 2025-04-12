
import { inject, Injectable, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { environment } from "@/environments/environment";
import { AuthStore } from "@/stores/AuthStore";
import { ApiResponse, ApiResponseSingle } from "../domain/ApiResponse";
import { UserEntity } from "../domain/entities/UserEntity";

@Injectable({ providedIn: 'root' })
export class AuthService implements OnInit {

  authStore = inject(AuthStore)
  http = inject(HttpClient)
  router = inject(Router)


  constructor() {
    this.authStore.updateIsAuthenticated(this.authStore.isLoggedIn());
  }

  ngOnInit() {
  }

  login(credentials :{correo_electronico: string, password: string}) {
    return this.http.post<ApiResponseSingle<UserEntity>>(`${environment.apiUrl}/Auth/Login`, credentials)
  }

  logout() {
    this.authStore.removeJWT()
    this.authStore.removePermissions()
    this.authStore.updateIsAuthenticated(this.authStore.isLoggedIn())
    this.router.navigate([''],{replaceUrl:true})
  }
}
