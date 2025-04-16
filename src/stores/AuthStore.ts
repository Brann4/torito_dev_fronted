import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { DtoDecodedJWT } from "@/app/domain/dtos/DtoDecodedJWT";
import { UserEntity } from "@/app/domain/entities/UserEntity";
import { StorageService } from "@/app/services/storage.service";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "@/app/services/system/user.service";
import { firstValueFrom } from "rxjs";
import { Router } from "express";
import { MessageService } from "primeng/api";


export type AuthState = {
  userAuthenticated: UserEntity | null,
  isAuthenticated: boolean
}

const initialState: AuthState = {
  userAuthenticated: null,
  isAuthenticated: false
}


export const AuthStore = signalStore(
  { providedIn: 'root' },

  withState<AuthState>(initialState),

  withMethods(
    (
      state,
      storeService = inject(StorageService),
      userService = inject(UserService),
      router = inject(Router),
      messageService = inject(MessageService),
    ) => ({
      isLoggedIn() {
        const tokenJWT = this.getJWT()
        return (tokenJWT && tokenJWT.length > 0) ? true : false
      },
      saveJWT(JWT: string) {
        storeService.set('JWT', JWT)
      },
      getJWT() {
        return storeService.get('JWT') || null
      },
      removeJWT() {
        storeService.remove('JWT')
      },
      setUserAuthenticated(user: UserEntity) {
        patchState(state, { userAuthenticated: user })
      },

      parseJWTClaims(JWT: string): any | null {
        try {
          const payload = JWT.split('.')[1];

          if (typeof window !== 'undefined') {
            const decoded = window.atob(payload);
            console.log(JSON.parse(decoded) )
            return JSON.parse(decoded);
          }
        } catch (error) {
          console.error('Error al decodificar el JWT:', error);
        }
        return null;
      },

      getUserId(): number | null {
        return this.getUserIdFromJWT(this.getJWT() || '');
      },
      //TODO: Determinar porque del backend pasa 60 y llega en fecha a 40 minutos de expiracion
      getTokenExpirationDate(): Date | null {
        const JWT = this.getJWT();
        if (!JWT) return null;
        const claims = this.parseJWTClaims(JWT);
        if (!claims || !claims.exp) return null;
        return new Date(claims.exp * 1000);
      },

      isTokenExpired(): boolean {
        const expiration = this.getTokenExpirationDate();
        if (!expiration) return true;

        console.log("fecha de expiracion:", expiration  );
        console.log("fecha de actual:", new Date());
        // Comparar con la fecha actual
        return expiration <= new Date();
      },

       // Método para verificar la expiración y configurar un temporizador
       setupExpirationCheck() {
        const expiration = this.getTokenExpirationDate();
        if (!expiration) return;

        const now = new Date();
        const timeUntilExpiration = expiration.getTime() - now.getTime();
        
        if (timeUntilExpiration <= 0) {
          // Ya expiró
          this.handleTokenExpiration();
          return;
        }

        // Configurar un temporizador para verificar cuando expire
        setTimeout(() => {
          this.handleTokenExpiration();
        }, timeUntilExpiration);

        // También configurar un temporizador para notificar al usuario 1 minuto antes
        if (timeUntilExpiration > 60000) { // 1 minuto en milisegundos
          setTimeout(() => {
            this.notifyExpirationWarning();
          }, timeUntilExpiration - 60000);
        }
      },
      // Método para manejar la expiración del token
      handleTokenExpiration() {
        if (this.isTokenExpired()) {
          // Cerrar sesión
          this.removeJWT();
          this.removePermissions();
          this.removeMenu();
          patchState(state, {
            isAuthenticated: false,
            userAuthenticated: null,
          });

          // Mostrar mensaje usando PrimeNG MessageService
          messageService.add({
            severity: 'warn',
            summary: 'Sesión expirada',
            detail: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
            life: 5000
          });

          // Redireccionar al login
          router.navigate(['/login']);
        }
      },

      // Método para notificar al usuario que la sesión está por expirar
      notifyExpirationWarning() {
        messageService.add({
          severity: 'info',
          summary: 'Aviso de sesión',
          detail: 'Su sesión expirará en 1 minuto. ¿Desea continuar conectado?',
          life: 30000,
          closable: true,
          // Si usas PrimeNG Toast con acciones personalizadas, puedes añadir botones aquí
        });
      },

      getUserIdFromJWT(JWT: string): number | null {
        const claims = this.parseJWTClaims(JWT);
        if (!claims) return null;

        let userId = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

        return Number(userId) || null;

      },

      async handleLoginResponse(response: any): Promise<boolean> {
        if (response && response.success) {
          this.saveJWT(response.data);
          const user = await this.getUserAuthenticated();
          return !!user;
        }

        return false;
      },
      async getUserAuthenticated(): Promise<UserEntity | null> {
        try {
          const token = this.getJWT();
          if (!token || token === '{}') {
            patchState(state, { isAuthenticated: false, userAuthenticated: null });
            return null;
          }

          const userId = this.getUserIdFromJWT(token);
          if (!userId) {
            patchState(state, { isAuthenticated: false, userAuthenticated: null });
            return null;
          }

          const userDetails = await this.fetchUserDetails(userId);
          if (userDetails) {
            patchState(state, {
              isAuthenticated: true,
              userAuthenticated: userDetails
            })
          }
          return userDetails;

        } catch (error) {
          console.error('Error al decodificar el JWT:', error);
          return null;
        }
      },

      async fetchUserDetails(userId: number) : Promise<UserEntity | null> {

        try {
          const response = await firstValueFrom(userService.getById(userId));
          if(!response) return null;
          const user = response.data;
          patchState(state, { userAuthenticated: user });
          return user;
        }
        catch (error) {
          console.error('Error al obtener los detalles del usuario:', error);
          patchState(state, { userAuthenticated: null });
          return null
        }
      },
      storagePermissions(permissions: string) {
        storeService.set('permissions', permissions)
      },
      removePermissions() {
        storeService.remove('permissions')
      },
      storageMenu(menu: string) {
        storeService.set('menu', menu)
      },
      removeMenu() {
        storeService.remove('menu')
      },
      getMenu() {
        const menu = storeService.get('menu');
        return menu ? JSON.parse(menu) : null; // Asume que el menú es un JSON
      },
      updateIsAuthenticated(isAuthenticated: boolean) {
        patchState(state, { isAuthenticated });
      }
    })
  )
)
