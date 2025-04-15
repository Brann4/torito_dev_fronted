import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputTextModule} from 'primeng/inputtext';
import {SelectModule} from 'primeng/select';
import {RadioButton} from 'primeng/radiobutton';
import {TextareaModule} from 'primeng/textarea';
import {HelperStore} from '@/stores/HelpersStore';
import {getErrorByKey, getErrosOnControls} from '@/helpers';
import {EstadoConfirmacionStore} from '@/stores/system/EstadoConfirmacionStore';
import {
  EstadoConfirmacionService
} from '@/app/services/system/mantenimiento/estado-confirmacion/estado-confirmacion.service';
import {DtoEstadoConfirmacionCreate} from '@/app/domain/dtos/system/estado-confirmacion/DtoEstadoConfirmacionCreate';
import { AuthStore } from '@/stores/AuthStore';


@Component({
  selector: 'app-estado-confirmacion-create',
  imports: [
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    SelectModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    TextareaModule,
    CommonModule,
    RadioButton
  ],
  templateUrl: './estado-confirmacion-create.component.html',
  styleUrl: './estado-confirmacion-create.component.css'
})
export class EstadoConfirmacionCreateComponent implements OnInit {
  helperStore = inject(HelperStore);
  authStore = inject(AuthStore);
  estadoConfirmacionStore = inject(EstadoConfirmacionStore);
  estadoConfirmacionService = inject(EstadoConfirmacionService);
  formBuilder = inject(FormBuilder);

  FormEstadoConfirmacionCreate = this.formBuilder.group({
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
    usuario_creacion: new FormControl<number>(Number(this.authStore.getUserId()), {
      nonNullable: true,
    }),
  });

  isSubmitting = signal<boolean>(false);

  ngOnInit(): void { }

  onCloseModalCreate() {
    this.estadoConfirmacionStore.closeModalCreate();
    this.FormEstadoConfirmacionCreate.reset({
      usuario_creacion: Number(this.authStore.getUserId()),
    });
  }

  getErrorMessageOnCreate(controlName: string): string {
    const control = this.FormEstadoConfirmacionCreate.get(controlName as string);
    return getErrorByKey(controlName, control);
  }

  handleSubmit() {
    this.FormEstadoConfirmacionCreate.markAllAsTouched();

    if (this.FormEstadoConfirmacionCreate.valid) {
      this.isSubmitting.set(true);
      const selectedValues = this.FormEstadoConfirmacionCreate.getRawValue() as DtoEstadoConfirmacionCreate;

      this.estadoConfirmacionService.store(selectedValues).subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          this.onCloseModalCreate();
          this.helperStore.showToast({
            severity: 'success',
            summary: 'Estado Confirmacion registrado',
            detail: response.message,
          });
          this.estadoConfirmacionStore.doList();
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.helperStore.showToast({
            severity: 'error',
            summary: 'Error',
            detail: err.message,
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
