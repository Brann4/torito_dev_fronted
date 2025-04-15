import { DtoEntidadFinancieraEdit } from '@/app/domain/dtos/system/entidad-financiera/DtoEntidadFinancieraEdit';
import { EntidadFinancieraService } from '@/app/services/system/mantenimiento/entidad-financiera/entidad-financiera.service';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { AuthStore } from '@/stores/AuthStore';
import { HelperStore } from '@/stores/HelpersStore';
import { EntidadFinancieraStore } from '@/stores/system/EntidadFinancieraStore';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUpload } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButton } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-entidad-financiera-edit',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    FloatLabelModule,
    DropdownModule,
    TextareaModule,
    RadioButton,
    FileUpload,
  ],
  templateUrl: './entidad-financiera-edit.component.html',
  styleUrl: './entidad-financiera-edit.component.css',
})
export class EntidadFinancieraEditComponent {
  entidadFinancieraStore = inject(EntidadFinancieraStore);
  authStore = inject(AuthStore);
  entidadFinancieraService = inject(EntidadFinancieraService);
  helperStore = inject(HelperStore);
  formBuilder = inject(FormBuilder);
  selectedFile: File | null = null;

  FormEntidadFinancieraUpdate = this.formBuilder.group({
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
    usuario_modificacion: new FormControl<number>(0, {
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

  onFileSelect(event: any) {
    console.log('onFileSelect evento:', event);
    if (event.currentFiles && event.currentFiles.length > 0) {
      this.selectedFile = event.currentFiles[0];
      this.FormEntidadFinancieraUpdate.patchValue({
        logo: this.selectedFile,
      });
    }
  }

  loadEntityForEdit() {
    var entity = this.entidadFinancieraStore.entityEdit();
    if (entity) {
      this.FormEntidadFinancieraUpdate.patchValue({
        ...entity,
        usuario_modificacion: Number(this.authStore.getUserId()),
      });
    }
  }

  onCloseModalEdit() {
    this.entidadFinancieraStore.closeModalEdit();
    this.FormEntidadFinancieraUpdate.reset({
      usuario_modificacion: Number(this.authStore.getUserId()),
    });
    this.hasLoaded = false;
  }

  getErrorMessageEdit(controlName: string): string {
    const control = this.FormEntidadFinancieraUpdate.get(controlName as string);
    return getErrorByKey(controlName, control);
  }

  handleSubmit() {
    this.FormEntidadFinancieraUpdate.markAllAsTouched();

    let id =
      this.FormEntidadFinancieraUpdate.get('id_entidad_financiera')?.value ?? 0;
    let name = this.FormEntidadFinancieraUpdate.get('nombre')?.value ?? '';
    let iniciales =
      this.FormEntidadFinancieraUpdate.get('iniciales')?.value ?? '';
    const usuario_modificacion = Number(this.authStore.getUserId());

    const formData = new FormData();
    formData.append('id_entidad_financiera', id.toString());
    formData.append('nombre', name);
    formData.append('iniciales', iniciales);
    formData.append(
      'estado',
      this.FormEntidadFinancieraUpdate.get('estado')?.value ? 'true' : 'false'
    );

    if (this.selectedFile) {
      formData.append('logo', this.selectedFile);
    }
    formData.append('usuario_modificacion', usuario_modificacion.toString());

    if (this.FormEntidadFinancieraUpdate.valid) {
      this.entidadFinancieraStore.setSubmitting(true);
      this.entidadFinancieraService.update(formData).subscribe({
        next: (response) => {
          this.entidadFinancieraStore.setSubmitting(false);
          this.onCloseModalEdit();
          this.helperStore.showToast({
            severity: 'success',
            summary: 'Entidad Financiera actualizado',
            detail: response.message,
          });
          this.entidadFinancieraStore.doList();
        },
        error: (error) => {
          this.entidadFinancieraStore.setSubmitting(false);
          this.helperStore.showToast({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        },
      });
    } else {
      console.log(getErrosOnControls(this.FormEntidadFinancieraUpdate));
      this.helperStore.showToast({
        severity: 'error',
        summary: 'Error',
        detail: 'Complete los campos requeridos',
      });
    }
  }
}
