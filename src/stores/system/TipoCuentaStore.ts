import {DtoResponseTipoCuenta} from '@/app/domain/dtos/system/tipo-cuenta/DtoResponseTipoCuenta';
import {DtoTipoCuentaEdit} from '@/app/domain/dtos/system/tipo-cuenta/DtoTipoCuentaEdit';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {TipoCuentaService} from '@/app/services/system/mantenimiento/tipo-cuenta/tipo-cuenta.service';

export type TipoCuentaState = {
  entities: DtoResponseTipoCuenta[];
  isOpenCreate: boolean;
  isOpenEdit: boolean;
  entityEdit: DtoTipoCuentaEdit | null;
  isSubmitting: boolean;
};
const initialState: TipoCuentaState = {
  isOpenCreate: false,
  isOpenEdit: false,
  entityEdit: null,
  entities: [],
  isSubmitting: false,
};

export const TipoCuentaStore = signalStore(
  {providedIn: 'root'},
  withState<TipoCuentaState>(initialState),
  withMethods((state, tipoCuentaService = inject(TipoCuentaService)) => ({

    openModalCreate() {
      patchState(state, {isOpenCreate: true});
    },

    openModalEdit(entity: DtoTipoCuentaEdit) {
      patchState(state, {entityEdit: entity, isOpenEdit: true});
    },

    closeModalCreate() {
      patchState(state, {isOpenCreate: false});
    },

    closeModalEdit() {
      patchState(state, {isOpenEdit: false, entityEdit: null});
    },

    setSubmitting(isSubmitting: boolean) {
      patchState(state, {isSubmitting});
    },

    doList() {
      tipoCuentaService.list().subscribe({
        next: (entities) => {
          patchState(state, {entities});
        },
        error: (error) => {
          console.log({error});
        },
      });
    },
  }))
);
