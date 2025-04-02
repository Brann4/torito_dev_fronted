import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";


export type SidebarState = {
  isOpen : boolean,
  currentPath : string
}

const initialState : SidebarState = {
  isOpen : false,
  currentPath : ''
}


export const SidebarStore = signalStore(
  { providedIn: 'root' },
  withState<SidebarState>(initialState),
  withMethods(
    (state) => ({
      toggleSidebar(){
        patchState(state,{ isOpen : !state.isOpen()})
        console.log('toggleSidebar', state.isOpen())
      }
    })
  ),
)
