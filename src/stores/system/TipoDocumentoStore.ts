import {DtoResponseTipoDocumento} from '@/app/domain/dtos/system/tipo-documento/DtoResponseTipoDocumento';
import {DtoTipoDocumentoEdit} from '@/app/domain/dtos/system/tipo-documento/DtoTipoDocumentoEdit';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {TipoDocumentoService} from '@/app/services/system/mantenimiento/tipodocumento/tipo-documento.service';


export type TipoDocumentoState = {
  entities: DtoResponseTipoDocumento[];
  isOpenCreate: boolean;
  isOpenEdit: boolean;
  entityEdit: DtoTipoDocumentoEdit | null;
  isSubmitting: boolean;
};
const initialState: TipoDocumentoState = {
  isOpenCreate: false,
  isOpenEdit: false,
  entityEdit: null,
  entities: [],
  isSubmitting: false,
};

export const TipoDocumentoStore = signalStore(
  {providedIn: 'root'},
  withState<TipoDocumentoState>(initialState),
  withMethods((state, tipoDocumentoService = inject(TipoDocumentoService)) => ({

    openModalCreate() {
      patchState(state, {isOpenCreate: true});
    },

    openModalEdit(entity: DtoTipoDocumentoEdit) {
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
      tipoDocumentoService.list().subscribe({
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
