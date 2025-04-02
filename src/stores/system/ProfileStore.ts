import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"

export type ProfileState = {
    isOpenEdit : boolean,
    entityEdit : any | null,
}
const initialState : ProfileState = {
    isOpenEdit : false,
    entityEdit : null,
}


export const ProfileStore = signalStore(
    { providedIn: 'root' },
    withState<ProfileState>(initialState),
    withMethods(
        (state) => ({
            openModalEdit(entity : any){
                patchState(state,{ isOpenEdit : true, entityEdit : entity})
            },
            closeModalEdit(){
                patchState(state,{ isOpenEdit : false, entityEdit : null})
            },
        
        })
    )
)
