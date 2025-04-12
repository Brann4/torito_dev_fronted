import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { MessageService } from "primeng/api";


export type HelperState = {

}

const initialState : HelperState = {

}

type ToastParams = {
  severity: string,
  summary: string,
  detail: string
  life?: number
}

export const HelperStore = signalStore(
  { providedIn: 'root' },

  withState<HelperState>(initialState),
  withMethods(
    (
      state,
      messageService = inject(MessageService),
      router = inject(Router)
    ) => ({
      showToast(params:ToastParams){
        messageService.add({
          ...params,
          life: params.life ?? 3000 // Predeterminado a 3000 ms si no se especifica
        });
      },
    })
  )
)
