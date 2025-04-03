import { DtoEntidadFinancieraEdit } from '@/app/domain/dtos/system/entidad-financiera/DtoEntidadFinancieraEdit';
import { EntidadFinancieraService } from '@/app/services/system/mantenimiento/entidad-financiera/entidad-financiera.service';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { HelperStore } from '@/stores/HelpersStore';
import { EntidadFinancieraStore } from '@/stores/system/EntidadFinancieraStore';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';


@Component({
  selector: 'app-entidad-financiera-edit',
  imports: [
    FileUploadModule,
  ],
  templateUrl: './entidad-financiera-edit.component.html',
  styleUrl: './entidad-financiera-edit.component.css',
})
export class EntidadFinancieraEditComponent{
   entidadFinancieraStore = inject(EntidadFinancieraStore);
   entidadFinancieraService = inject(EntidadFinancieraService);
   helperStore = inject(HelperStore);
   formBuilder = inject(FormBuilder);
 
   FormUbigeoUpdate = this.formBuilder.group({
    id_entidad_financiera: new FormControl<number>(0, {
       validators: [Validators.min(1)],
       nonNullable: true,
     }),
     nombre: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true,
    }),
    iniciales: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: false,
    }),
    logo: new FormControl<any>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    estado: new FormControl<boolean>(false, {
      validators: [Validators.required],
      nonNullable: true,
    }),
   });
 
   hasLoaded = false;
 
   constructor() {
     effect(() => {
       if (this.entidadFinancieraStore.isOpenEdit() && !this.hasLoaded) {
         this.loadEntityForEdit();
         this.hasLoaded = true;
       }
     });
   }
 
   loadEntityForEdit() {
     //Carga datos de la tabla
     var entity = this.entidadFinancieraStore.entityEdit();
     if (entity) {
       this.FormUbigeoUpdate.patchValue(entity);
     }
   }
 
   onCloseModalEdit() {
     this.entidadFinancieraStore.closeModalEdit();
     this.FormUbigeoUpdate.reset();
     this.hasLoaded = false;
   }
 
   getErrorMessageEdit(controlName: string): string {
     const control = this.FormUbigeoUpdate.get(controlName as string);
     return getErrorByKey(controlName, control);
   }
 
   handleSubmit() {
       this.FormUbigeoUpdate.markAllAsTouched();
       if (this.FormUbigeoUpdate.valid) {
         console.log('Formulario válido:', this.FormUbigeoUpdate.getRawValue());
         this.entidadFinancieraStore.setSubmitting(true);
          const values = this.FormUbigeoUpdate.getRawValue();
       this.entidadFinancieraService.update(values as DtoEntidadFinancieraEdit).subscribe({
           next: (response) => {
             this.entidadFinancieraStore.setSubmitting(false);
             this.onCloseModalEdit();
             this.helperStore.showToast({ severity: 'success', summary: 'Ubigeo actualizado', detail: response.message });
             this.entidadFinancieraStore.doList();
           },
           error: (error) => {
             this.entidadFinancieraStore.setSubmitting(false);
             this.helperStore.showToast({ severity: 'error', summary: 'Error', detail: error.error.message });
           },
         });
       } else {
         console.log(getErrosOnControls(this.FormUbigeoUpdate));
         this.helperStore.showToast({ severity: 'error', summary: 'Error', detail: 'Complete los campos requeridos' });
       }
     }
}
