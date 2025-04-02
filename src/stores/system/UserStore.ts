
import { DtoResponseUser } from "@/app/domain/dtos/system/user/DtoResponseUser"
import { UserService } from "@/app/services/system/user.service"
import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"

export type UserState = {
    isOpenCreate : boolean,
    entities : DtoResponseUser[]
    isOpenEdit : boolean,
    entityEdit : DtoResponseUser | null,
    isSubmitting : boolean
}
const initialState : UserState = {
    isOpenCreate : false,
    isOpenEdit : false,
    entityEdit : null,
    entities : [],
    isSubmitting : false
}


export const UserStore = signalStore(
    { providedIn: 'root' },
    withState<UserState>(initialState),
    withMethods(
        (state,userService = inject(UserService)) => ({
            openModalCreate(){
                patchState(state,{ isOpenCreate : true})
            },
            openModalEdit(entity : DtoResponseUser){
                patchState(state,{ entityEdit : entity , isOpenEdit : true})
            },
            closeModalCreate(){
                patchState(state,{ isOpenCreate : false})
            },
            closeModalEdit(){
                patchState(state,{ isOpenEdit : false , entityEdit : null})
            },
            setSubmitting(isSubmitting : boolean){
                patchState(state,{ isSubmitting })
            },
            doList(){
              const datos =  [
                    {
                        "id": 11,
                        "name": "Usuario 10",
                        "email": "usuario10@gmail.com",
                        "phone": "912345678",
                        "email_verified_at": "2025-03-31T17:01:35.000000Z",
                        "role_id": 4,
                        "status": 1,
                        "login_attempts": 0,
                        "is_locked": 0,
                        "lockout_time": null,
                        "last_ip_address": null,
                        "created_at": "2025-03-31T17:01:35.000000Z",
                        "updated_at": "2025-03-31T17:01:35.000000Z",
                        "deleted_at": null,
                        "role": {
                            "id": 4,
                            "name": "Supervisor de contratos",
                            "created_at": null,
                            "updated_at": null,
                            "deleted_at": null
                        },
                        "current_employee": null
                    },
                    {
                        "id": 10,
                        "name": "Usuario 9",
                        "email": "usuario9@gmail.com",
                        "phone": "912345678",
                        "email_verified_at": "2025-03-31T17:01:35.000000Z",
                        "role_id": 5,
                        "status": 1,
                        "login_attempts": 0,
                        "is_locked": 0,
                        "lockout_time": null,
                        "last_ip_address": null,
                        "created_at": "2025-03-31T17:01:35.000000Z",
                        "updated_at": "2025-03-31T17:01:35.000000Z",
                        "deleted_at": null,
                        "role": {
                            "id": 5,
                            "name": "Auditor",
                            "created_at": null,
                            "updated_at": null,
                            "deleted_at": null
                        },
                        "current_employee": null
                    },
                    {
                        "id": 9,
                        "name": "Usuario 8",
                        "email": "usuario8@gmail.com",
                        "phone": "912345678",
                        "email_verified_at": "2025-03-31T17:01:35.000000Z",
                        "role_id": 2,
                        "status": 1,
                        "login_attempts": 0,
                        "is_locked": 0,
                        "lockout_time": null,
                        "last_ip_address": null,
                        "created_at": "2025-03-31T17:01:35.000000Z",
                        "updated_at": "2025-03-31T17:01:35.000000Z",
                        "deleted_at": null,
                        "role": {
                            "id": 2,
                            "name": "admin",
                            "created_at": null,
                            "updated_at": null,
                            "deleted_at": null
                        },
                        "current_employee": null
                    },
                    {
                        "id": 8,
                        "name": "Usuario 7",
                        "email": "usuario7@gmail.com",
                        "phone": "912345678",
                        "email_verified_at": "2025-03-31T17:01:34.000000Z",
                        "role_id": 5,
                        "status": 1,
                        "login_attempts": 0,
                        "is_locked": 0,
                        "lockout_time": null,
                        "last_ip_address": null,
                        "created_at": "2025-03-31T17:01:34.000000Z",
                        "updated_at": "2025-03-31T17:01:34.000000Z",
                        "deleted_at": null,
                        "role": {
                            "id": 5,
                            "name": "Auditor",
                            "created_at": null,
                            "updated_at": null,
                            "deleted_at": null
                        },
                        "current_employee": null
                    },
                    {
                        "id": 7,
                        "name": "Usuario 6",
                        "email": "usuario6@gmail.com",
                        "phone": "912345678",
                        "email_verified_at": "2025-03-31T17:01:34.000000Z",
                        "role_id": 5,
                        "status": 1,
                        "login_attempts": 0,
                        "is_locked": 0,
                        "lockout_time": null,
                        "last_ip_address": null,
                        "created_at": "2025-03-31T17:01:34.000000Z",
                        "updated_at": "2025-03-31T17:01:34.000000Z",
                        "deleted_at": null,
                        "role": {
                            "id": 5,
                            "name": "Auditor",
                            "created_at": null,
                            "updated_at": null,
                            "deleted_at": null
                        },
                        "current_employee": null
                    },
                ];
            patchState(state,{ entities: datos as any })
                // userService.list().subscribe({
                //     next : (entities) => {
                //         console.log({entities})
                //         patchState(state,{ entities })
                //     },
                //     error : (error) => {
                //         console.log({error})
                //     }
                // })

            },
        })
    )
)
