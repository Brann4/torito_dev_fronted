import {inject} from '@angular/core';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {DtoResponseRol} from '@/app/domain/dtos/system/rol/DtoResponseRol';
import {RolService} from '@/app/services/system/mantenimiento/rol/rol.service';

export type RolState = {
  entities: DtoResponseRol[];
  isOpenCreate: boolean;
  isOpenEdit: boolean;
  entityEdit: DtoResponseRol | null;
  isSubmitting: boolean;
};
const initialState: RolState = {
  isOpenCreate: false,
  isOpenEdit: false,
  entityEdit: null,
  entities: [],
  isSubmitting: false,
};

export const RolStore = signalStore(
  {providedIn: 'root'},
  withState<RolState>(initialState),
  withMethods((state, rolService = inject(RolService)) => ({

    openModalCreate() {
      patchState(state, {isOpenCreate: true});
    },

    openModalEdit(entity: DtoResponseRol) {
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
      rolService.list().subscribe({
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
