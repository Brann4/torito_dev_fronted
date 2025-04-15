import {Component, effect, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputTextModule} from 'primeng/inputtext';
import {TextareaModule} from 'primeng/textarea';
import {RadioButton} from 'primeng/radiobutton';
import {HelperStore} from '@/stores/HelpersStore';
import {getErrorByKey, getErrosOnControls} from '@/helpers';
import {TipoDocumentoStore} from '@/stores/system/TipoDocumentoStore';
import {TipoDocumentoService} from '@/app/services/system/mantenimiento/tipo-documento/tipo-documento.service';
import {DtoTipoDocumentoEdit} from '@/app/domain/dtos/system/tipo-documento/DtoTipoDocumentoEdit';
import { AuthStore } from '@/stores/AuthStore';

@Component({
  selector: 'app-tipo-documento-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    FloatLabelModule,
    DropdownModule,
    TextareaModule,
    RadioButton
  ],
  templateUrl: './tipo-documento-edit.component.html',
  styleUrl: './tipo-documento-edit.component.css'
})
export class TipoDocumentoEditComponent {
  authStore = inject(AuthStore);
  tipoDocumentoStore = inject(TipoDocumentoStore);
  tipoDocumentoService = inject(TipoDocumentoService);
  helperStore = inject(HelperStore);
  formBuilder = inject(FormBuilder);

  FormTipoDocumentoUpdate = this.formBuilder.group({
    id_tipo_documento: new FormControl<number>(0, {
      validators: [Validators.min(1)],
      nonNullable: true,
    }),
    descripcion: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true,
    }),
    estado: new FormControl<boolean>(false, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    usuario_modificacion: new FormControl<number>(Number(this.authStore.getUserId()), {
      nonNullable: true,
    }),
  });

  hasLoaded = false;

  constructor() {
    effect(() => {
      if (this.tipoDocumentoStore.isOpenEdit() && !this.hasLoaded) {
        this.loadEntityForEdit();
        this.hasLoaded = true;
      }
    });
  }

  loadEntityForEdit() {
    var entity = this.tipoDocumentoStore.entityEdit();
    if (entity) {
      this.FormTipoDocumentoUpdate.patchValue({
        ...entity,
        usuario_modificacion: Number(this.authStore.getUserId()),
      });
    }
  }

  onCloseModalEdit() {
    this.tipoDocumentoStore.closeModalEdit();
    this.FormTipoDocumentoUpdate.reset({
      usuario_modificacion: Number(this.authStore.getUserId()),
    });
    this.hasLoaded = false;
  }
  
  getErrorMessageEdit(controlName: string): string {
    const control = this.FormTipoDocumentoUpdate.get(controlName as string);
    return getErrorByKey(controlName, control);
  }

  handleSubmit() {
    this.FormTipoDocumentoUpdate.markAllAsTouched();
    if (this.FormTipoDocumentoUpdate.valid) {
      this.tipoDocumentoStore.setSubmitting(true);

      const values = this.FormTipoDocumentoUpdate.getRawValue();
      
      this.tipoDocumentoService.update(values as DtoTipoDocumentoEdit).subscribe({
        next: (response) => {
          this.tipoDocumentoStore.setSubmitting(false);
          this.onCloseModalEdit();
          this.helperStore.showToast({
            severity: 'success',
            summary: 'Tipo Documento actualizado',
            detail: response.message
          });
          this.tipoDocumentoStore.doList();
        },
        error: (error) => {
          this.tipoDocumentoStore.setSubmitting(false);
          this.helperStore.showToast({severity: 'error', summary: 'Error', detail: error.error.message});
        },
      });
    } else {
      console.log(getErrosOnControls(this.FormTipoDocumentoUpdate));
      this.helperStore.showToast({severity: 'error', summary: 'Error', detail: 'Complete los campos requeridos'});
    }
  }
}
