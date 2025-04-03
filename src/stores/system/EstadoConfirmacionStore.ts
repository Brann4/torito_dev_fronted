import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {DtoResponseEstadoConfirmacion} from '@/app/domain/dtos/system/estado-confirmacion/DtoResponseEstadoConfirmacion';
import {DtoEstadoConfirmacionEdit} from '@/app/domain/dtos/system/estado-confirmacion/DtoEstadoConfirmacionEdit';
import {EstadoConfirmacionService} from '@/app/services/system/mantenimiento/estado-confirmacion/estado-confirmacion.service';

export type EstadoConfirmacionState = {
  entities: DtoResponseEstadoConfirmacion[];
  isOpenCreate: boolean;
  isOpenEdit: boolean;
  entityEdit: DtoEstadoConfirmacionEdit | null;
  isSubmitting: boolean;
};
const initialState: EstadoConfirmacionState = {
  isOpenCreate: false,
  isOpenEdit: false,
  entityEdit: null,
  entities: [],
  isSubmitting: false,
};

export const EstadoConfirmacionStore = signalStore(
  {providedIn: 'root'},
  withState<EstadoConfirmacionState>(initialState),
  withMethods((state, estadoConfirmacionService = inject(EstadoConfirmacionService)) => ({

    openModalCreate() {
      patchState(state, {isOpenCreate: true});
    },

    openModalEdit(entity: DtoEstadoConfirmacionEdit) {
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
      estadoConfirmacionService.list().subscribe({
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
