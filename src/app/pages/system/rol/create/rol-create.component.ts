import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { TextareaModule } from 'primeng/textarea';
import { HelperStore } from '@/stores/HelpersStore';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { RolStore } from '@/stores/system/RolStore';
import { RolService } from '@/app/services/system/mantenimiento/rol/rol.service';
import { DtoRolCreate } from '@/app/domain/dtos/system/rol/DtoRolCreate';
import { AuthStore } from '@/stores/AuthStore';

@Component({
  selector: 'app-rol-create',
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
  templateUrl: './rol-create.component.html',
  styleUrl: './rol-create.component.css'
})
export class RolCreateComponent implements OnInit {
  rolStore = inject(RolStore);
  rolService = inject(RolService);
  authStore = inject(AuthStore);
  helperStore = inject(HelperStore);
  formBuilder = inject(FormBuilder);
  isActive!: boolean;

  FormRolCreate = this.formBuilder.group({
    nombre_rol: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true,
    }),
    estado: new FormControl<boolean>(false, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    usuario_creacion: new FormControl<number>(Number(this.authStore.getUserId()), {
      nonNullable: true
    }),
  });

  isSubmitting = signal<boolean>(false);

  ngOnInit(): void {
  }

  onCloseModalCreate() {
    this.rolStore.closeModalCreate();
    this.FormRolCreate.reset();
  }

  getErrorMessageOnCreate(controlName: string): string {
    const control = this.FormRolCreate.get(controlName as string);
    return getErrorByKey(controlName, control);
  }

  handleSubmit() {
    this.FormRolCreate.markAllAsTouched();

    if (this.FormRolCreate.valid) {
      this.isSubmitting.set(true);
      const selectedValues = this.FormRolCreate.getRawValue() as DtoRolCreate;

     this.rolService.store(selectedValues).subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          this.onCloseModalCreate();
          this.helperStore.showToast({
            severity: 'success',
            summary: 'Rol registrado',
            detail: response.message,
          });
          this.rolStore.doList();
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
