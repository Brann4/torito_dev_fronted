

import { DtoResponseUbigeo } from '@/app/domain/dtos/system/ubigeo/DtoResponseUbigeo';
import { DtoUbigeoEdit } from '@/app/domain/dtos/system/ubigeo/DtoUbigeoEdit';
import { UbigeoService } from '@/app/services/system/mantenimiento/ubigeo/ubigeo.service';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';


export type UbigeoState = {
  entities: DtoResponseUbigeo[];
  isOpenCreate: boolean;
  isOpenEdit: boolean;
  entityEdit: DtoUbigeoEdit | null;
  isSubmitting: boolean;
};
const initialState: UbigeoState = {
  isOpenCreate: false,
  isOpenEdit: false,
  entityEdit: null,
  entities: [],
  isSubmitting: false,
};

export const UbigeosStore = signalStore(
  { providedIn: 'root' },
  withState<UbigeoState>(initialState),
  withMethods((state, ubigeoService = inject(UbigeoService)) => ({

    openModalCreate() {
      patchState(state, { isOpenCreate: true });
    },

    openModalEdit(entity: DtoUbigeoEdit) {
      patchState(state, { entityEdit: entity, isOpenEdit: true });
    },

    closeModalCreate() {
      patchState(state, { isOpenCreate: false });
    },

    closeModalEdit() {
      patchState(state, { isOpenEdit: false, entityEdit: null });
    },

    setSubmitting(isSubmitting: boolean) {
      patchState(state, { isSubmitting });
    },

    doList() {
      ubigeoService.list().subscribe({
        next: (entities) => {
          patchState(state, {entities});
        },
        error: (error) => {
          console.log({ error });
        },
      });
    },
  }))
);
