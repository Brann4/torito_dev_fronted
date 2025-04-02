
import { StorageService } from "@/app/services/storage.service";
import { inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { DOCUMENT } from "@angular/common";

export type ToolbarState = {
  isDark : boolean,
  isOpenDialogThemes : boolean,
}

const initialState : ToolbarState = {
  isDark : false,
  isOpenDialogThemes : false,
}

export const ToolbarStore = signalStore(
  { providedIn: 'root' },
  withState<ToolbarState>(initialState),
  withMethods(
    (state,
       storageService = inject(StorageService),
       document = inject(DOCUMENT)
    ) => ({
      toggleDark(){
        const element = document.querySelector('html');
        if (element) {
            element.classList.toggle('my-app-dark');
            const isDarkModeActive = element.classList.contains('my-app-dark');
            storageService.set('darkMode', isDarkModeActive ? 'true' : 'false');
        }
      },
      applyDarkMode(){
        const element = document.querySelector('html');
        const darkMode = storageService.get('darkMode');
      
        if (darkMode === 'true' && element) {
          storageService.set('darkMode', 'true');
          element.classList.add('my-app-dark');
        }else{
          storageService.set('darkMode', 'false');
          element?.classList.remove('my-app-dark');
        }
      },

      isDarkModeActive(){
        let darkMode = storageService.get('darkMode')
        return ((darkMode === 'true') ? true : false)
      },
    })
  )
)
