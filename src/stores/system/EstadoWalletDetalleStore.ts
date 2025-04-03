import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {
  DtoResponseEstadoWalletDetalle
} from '@/app/domain/dtos/system/estado-wallet-detalle/DtoResponseEstadoWalletDetalle';
import {
  EstadoWalletDetalleService
} from '@/app/services/system/mantenimiento/estado-wallet-detalle/estado-wallet-detalle.service';

export type EstadoWalletDetalleState = {
  entities: DtoResponseEstadoWalletDetalle[];
  isOpenCreate: boolean;
  isOpenEdit: boolean;
  entityEdit: DtoResponseEstadoWalletDetalle | null;
  isSubmitting: boolean;
};
const initialState: EstadoWalletDetalleState = {
  isOpenCreate: false,
  isOpenEdit: false,
  entityEdit: null,
  entities: [],
  isSubmitting: false,
};

export const EstadoWalletDetalleStore = signalStore(
  {providedIn: 'root'},
  withState<EstadoWalletDetalleState>(initialState),
  withMethods((state, estadoWalletDetalleService = inject(EstadoWalletDetalleService)) => ({

    openModalCreate() {
      patchState(state, {isOpenCreate: true});
    },

    openModalEdit(entity: DtoResponseEstadoWalletDetalle) {
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
      estadoWalletDetalleService.list().subscribe({
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
