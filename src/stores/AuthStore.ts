import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { DtoDecodedJWT } from "@/app/domain/dtos/DtoDecodedJWT";
import { UserEntity } from "@/app/domain/entities/UserEntity";
import { StorageService } from "@/app/services/storage.service";
import { inject } from "@angular/core";


export type AuthState = {
  userAuthenticated : UserEntity | null,
  isAuthenticated : boolean
}

const initialState : AuthState = {
  userAuthenticated : {
    id : 0,
    name : '',
    email : '',
    constraint : '',
    email_verified_at : '',
    password : '',
    remember_token : '',
    created_at : '',
    updated_at : '',
    role_id : 0,
  },
  isAuthenticated : false
}


export const AuthStore = signalStore(
  { providedIn: 'root' },

  withState<AuthState>(initialState),
  withMethods(
    (
      state,storeService = inject(StorageService)
    ) => ({
      isLoggedIn() {
        const tokenJWT = this.getJWT()
        return (tokenJWT && tokenJWT.length > 0) ? true : false
      },
      saveJWT(JWT: string) {
        storeService.set('JWT',JWT)
      },
      getJWT() {
        return storeService.get('JWT') || '{}'
      },
      removeJWT() {
        storeService.remove('JWT')
      },
      setUserAuthenticated(user: UserEntity) {
        patchState(state,{ userAuthenticated: user })
      },
      decodeJWT(JWT: string) {
        const payload = JWT.split('.')[1];
      
        if (typeof window !== 'undefined') {
          const decoded = window.atob(payload);
          const parsed = JSON.parse(decoded) as DtoDecodedJWT;
          return parsed;
        } else {
          console.error('window is not defined');
          return null;
        }
      },
      getUserAuthenticated() {
        const jwt = this.getJWT();
        
        // Verificar si existe el JWT y tiene contenido
        if (!jwt || jwt === '{}') {
          return null;
        }
      
        try {
          const decoded = this.decodeJWT(jwt);
          return decoded?.user || null; // Asegúrate de devolver null si user no existe
        } catch (error) {
          console.error('Error al decodificar el JWT:', error);
          return null;
        }
      },      
      storagePermissions(permissions : string) {
        storeService.set('permissions',permissions)
      },
      removePermissions() {
        storeService.remove('permissions')
      },
      storageMenu(menu : string) {
        storeService.set('menu',menu)
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
