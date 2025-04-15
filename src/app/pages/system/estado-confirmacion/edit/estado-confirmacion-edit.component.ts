import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { RadioButton } from 'primeng/radiobutton';
import { HelperStore } from '@/stores/HelpersStore';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { EstadoConfirmacionStore } from '@/stores/system/EstadoConfirmacionStore';
import { EstadoConfirmacionService } from '@/app/services/system/mantenimiento/estado-confirmacion/estado-confirmacion.service';
import { DtoEstadoConfirmacionEdit } from '@/app/domain/dtos/system/estado-confirmacion/DtoEstadoConfirmacionEdit';
import { AuthStore } from '@/stores/AuthStore';

@Component({
  selector: 'app-estado-confirmacion-edit',
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
    RadioButton,
  ],
  templateUrl: './estado-confirmacion-edit.component.html',
  styleUrl: './estado-confirmacion-edit.component.css',
})
export class EstadoConfirmacionEditComponent {
  helperStore = inject(HelperStore);
  estadoConfirmacionStore = inject(EstadoConfirmacionStore);
  estadoConfirmacionService = inject(EstadoConfirmacionService);
  formBuilder = inject(FormBuilder);
  authStore = inject(AuthStore);

  FormEstadoConfirmacionUpdate = this.formBuilder.group({
    id_estado_confirmacion: new FormControl<number>(0, {
      validators: [Validators.min(1)],
      nonNullable: true,
    }),
    descripcion: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true,
    }),
    mensaje: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true,
    }),
    estado: new FormControl<boolean>(false, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    usuario_modificacion: new FormControl<number>(
      Number(this.authStore.getUserId()),
      {
        nonNullable: true,
      }
    ),
  });

  hasLoaded = false;

  constructor() {
    effect(() => {
      if (this.estadoConfirmacionStore.isOpenEdit() && !this.hasLoaded) {
        this.loadEntityForEdit();
        this.hasLoaded = true;
      }
    });
  }

  loadEntityForEdit() {
    var entity = this.estadoConfirmacionStore.entityEdit();
    if (entity) {
      this.FormEstadoConfirmacionUpdate.patchValue({
        ...entity,
        usuario_modificacion: Number(this.authStore.getUserId()),
      });
    }
  }

  onCloseModalEdit() {
    this.estadoConfirmacionStore.closeModalEdit();
    this.FormEstadoConfirmacionUpdate.reset({
      usuario_modificacion: Number(this.authStore.getUserId()),
    });
    this.hasLoaded = false;
  }

  getErrorMessageEdit(controlName: string): string {
    const control = this.FormEstadoConfirmacionUpdate.get(
      controlName as string
    );
    return getErrorByKey(controlName, control);
  }

  handleSubmit() {
    this.FormEstadoConfirmacionUpdate.markAllAsTouched();
    if (this.FormEstadoConfirmacionUpdate.valid) {
      this.estadoConfirmacionStore.setSubmitting(true);
      const selectedValues = this.FormEstadoConfirmacionUpdate.getRawValue() as DtoEstadoConfirmacionEdit;
      this.estadoConfirmacionService.update(selectedValues)
        .subscribe({
          next: (response) => {
            this.estadoConfirmacionStore.setSubmitting(false);
            this.onCloseModalEdit();
            this.helperStore.showToast({
              severity: 'success',
              summary: 'Estado Confirmacion actualizado',
              detail: response.message,
            });
            this.estadoConfirmacionStore.doList();
          },
          error: (error) => {
            this.estadoConfirmacionStore.setSubmitting(false);
            this.helperStore.showToast({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message,
            });
          },
        });
    } else {
      this.helperStore.showToast({
        severity: 'error',
        summary: 'Error',
        detail: 'Complete los campos requeridos',
      });
    }
  }
}
