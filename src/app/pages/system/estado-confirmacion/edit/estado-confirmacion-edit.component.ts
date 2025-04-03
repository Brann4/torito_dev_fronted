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
import {EstadoConfirmacionStore} from '@/stores/system/EstadoConfirmacionStore';
import {
  EstadoConfirmacionService
} from '@/app/services/system/mantenimiento/estado-confirmacion/estado-confirmacion.service';
import {DtoEstadoConfirmacionEdit} from '@/app/domain/dtos/system/estado-confirmacion/DtoEstadoConfirmacionEdit';

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
    RadioButton
  ],
  templateUrl: './estado-confirmacion-edit.component.html',
  styleUrl: './estado-confirmacion-edit.component.css'
})
export class EstadoConfirmacionEditComponent {
  helperStore = inject(HelperStore);
  estadoConfirmacionStore = inject(EstadoConfirmacionStore);
  estadoConfirmacionService = inject(EstadoConfirmacionService);
  formBuilder = inject(FormBuilder);

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
    //Carga datos de la tabla
    var entity = this.estadoConfirmacionStore.entityEdit();
    if (entity) {
      this.FormEstadoConfirmacionUpdate.patchValue(entity);
    }
  }

  onCloseModalEdit() {
    this.estadoConfirmacionStore.closeModalEdit();
    this.FormEstadoConfirmacionUpdate.reset();
    this.hasLoaded = false;
  }

  getErrorMessageEdit(controlName: string): string {
    const control = this.FormEstadoConfirmacionUpdate.get(controlName as string);
    return getErrorByKey(controlName, control);
  }

  handleSubmit() {
    this.FormEstadoConfirmacionUpdate.markAllAsTouched();
    if (this.FormEstadoConfirmacionUpdate.valid) {
      console.log('Formulario válido:', this.FormEstadoConfirmacionUpdate.getRawValue());
      this.estadoConfirmacionStore.setSubmitting(true);
      const values = this.FormEstadoConfirmacionUpdate.getRawValue();
      this.estadoConfirmacionService.update(values as DtoEstadoConfirmacionEdit).subscribe({
        next: (response) => {
          this.estadoConfirmacionStore.setSubmitting(false);
          this.onCloseModalEdit();
          this.helperStore.showToast({
            severity: 'success',
            summary: 'Estado Confirmacion actualizado',
            detail: response.message
          });
          this.estadoConfirmacionStore.doList();
        },
        error: (error) => {
          this.estadoConfirmacionStore.setSubmitting(false);
          this.helperStore.showToast({severity: 'error', summary: 'Error', detail: error.error.message});
        },
      });
    } else {
      console.log(getErrosOnControls(this.FormEstadoConfirmacionUpdate));
      this.helperStore.showToast({severity: 'error', summary: 'Error', detail: 'Complete los campos requeridos'});
    }
  }
}
