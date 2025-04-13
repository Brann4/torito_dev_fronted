
import { DtoResponseUser } from "@/app/domain/dtos/system/user/DtoResponseUser"
import { UserService } from "@/app/services/system/user.service"
import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"

export type UserState = {
    isOpenCreate : boolean,
    entities : DtoResponseUser[]
    isOpenEdit : boolean,
    entityEdit : DtoResponseUser | null,
    isSubmitting : boolean,
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
        (state,
          userService = inject(UserService)) => ({
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
                 userService.list().subscribe({
                     next : (users) => {
                         patchState(state, { entities : users })
                     },
                     error : (error) => {
                         console.log({error})
                     }
                 })

            },
        })
    )
)
