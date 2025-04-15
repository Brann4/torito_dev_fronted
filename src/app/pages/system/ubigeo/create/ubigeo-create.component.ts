import { DtoUbigeoCreate } from '@/app/domain/dtos/system/ubigeo/DtoUbigeoCreate';
import { UbigeoService } from '@/app/services/system/mantenimiento/ubigeo/ubigeo.service';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { TextareaModule } from 'primeng/textarea';

import { HelperStore } from '@/stores/HelpersStore';
import { UbigeosStore } from '@/stores/system/UbigeoStore';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { RadioButton } from 'primeng/radiobutton';
import { AuthStore } from '@/stores/AuthStore';

@Component({
  selector: 'app-ubigeo-create',
  standalone: true,
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
  templateUrl: './ubigeo-create.component.html',
})



export class UbigeoCreateComponent implements OnInit {
  authStore = inject(AuthStore);
  helperStore = inject(HelperStore);
  ubigeoStore = inject(UbigeosStore);
  ubigeoService = inject(UbigeoService);
  formBuilder = inject(FormBuilder);
  isActive!: boolean;
  

  frmCreate = this.formBuilder.group({
    id_pais: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true,
    }),
    id_departamento: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true,
    }),
    id_provincia: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true,
    }),
    id_distrito: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true,
    }),
    descripcion: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true,
    }),
    codigo_telefonico: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true,
    }),
    bandera: new FormControl<string>('', {
      validators: [Validators.required],
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

  ngOnInit(): void {}

  onCloseModalCreate() {
    this.ubigeoStore.closeModalCreate();
    this.frmCreate.reset({
      usuario_creacion: Number(this.authStore.getUserId()),
    });
  }

  getErrorMessageOnCreate(controlName: string): string {
    const control = this.frmCreate.get(controlName as string);
    return getErrorByKey(controlName, control);
  }

  handleSubmit() {
    this.frmCreate.markAllAsTouched();

    if (this.frmCreate.valid) {
      this.isSubmitting.set(true);
      const selectedValues = this.frmCreate.getRawValue();

      this.ubigeoService.store(selectedValues as DtoUbigeoCreate).subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          this.onCloseModalCreate();
          this.helperStore.showToast({
            severity: 'success',
            summary: 'Ubigeo registrado',
            detail: response.message,
          });
          this.ubigeoStore.doList();
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
