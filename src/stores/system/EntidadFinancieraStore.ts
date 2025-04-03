import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {DtoResponseEntidadFinanciera} from '@/app/domain/dtos/system/entidad-financiera/DtoResponseEntidadFinanciera';
import {DtoEntidadFinancieraEdit} from '@/app/domain/dtos/system/entidad-financiera/DtoEntidadFinancieraEdit';
import {
  EntidadFinancieraService
} from '@/app/services/system/mantenimiento/entidad-financiera/entidad-financiera.service';

export type EntidadFinancieraState = {
  entities: DtoResponseEntidadFinanciera[];
  isOpenCreate: boolean;
  isOpenEdit: boolean;
  entityEdit: DtoEntidadFinancieraEdit | null;
  isSubmitting: boolean;
};
const initialState: EntidadFinancieraState = {
  isOpenCreate: false,
  isOpenEdit: false,
  entityEdit: null,
  entities: [],
  isSubmitting: false,
};

export const EntidadFinancieraStore = signalStore(
  {providedIn: 'root'},
  withState<EntidadFinancieraState>(initialState),
  withMethods((state, entidadFinancieraService = inject(EntidadFinancieraService)) => ({

    openModalCreate() {
      patchState(state, {isOpenCreate: true});
    },

    openModalEdit(entity: DtoEntidadFinancieraEdit) {
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
      entidadFinancieraService.list().subscribe({
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

