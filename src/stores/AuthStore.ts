import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { DtoDecodedJWT } from "@/app/domain/dtos/DtoDecodedJWT";
import { UserEntity } from "@/app/domain/entities/UserEntity";
import { StorageService } from "@/app/services/storage.service";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "@/app/services/system/user.service";
import { firstValueFrom } from "rxjs";


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
    ) => ({
      isLoggedIn() {
        const tokenJWT = this.getJWT()
        return (tokenJWT && tokenJWT.length > 0) ? true : false
      },
      saveJWT(JWT: string) {
        storeService.set('JWT', JWT)
      },
      getJWT() {
        return storeService.get('JWT') || '{}'
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
            return JSON.parse(decoded);
          }
        } catch (error) {
          console.error('Error al decodificar el JWT:', error);
        }
        return null;
      },

      getUserId(): number | null {
          return  Number(this.getUserIdFromJWT(this.getJWT()));
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
