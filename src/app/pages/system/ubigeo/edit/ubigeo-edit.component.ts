import { UbigeoService } from '@/app/services/system/mantenimiento/ubigeo/ubigeo.service';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { HelperStore } from '@/stores/HelpersStore';
import { UbigeosStore } from '@/stores/system/UbigeoStore';
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';;
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DtoUbigeoEdit } from '@/app/domain/dtos/system/ubigeo/DtoUbigeoEdit';
import { TextareaModule } from 'primeng/textarea';
import { RadioButton } from 'primeng/radiobutton';





@Component({
  selector: 'app-ubigeo-edit',
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
  templateUrl: './ubigeo-edit.component.html',
})
export class UbigeoEditComponent {
  ubigeoStore = inject(UbigeosStore);
  ubigeoService = inject(UbigeoService);
  helperStore = inject(HelperStore);
  formBuilder = inject(FormBuilder);

  FormUbigeoUpdate = this.formBuilder.group({
    id_ubigeo: new FormControl<number>(0, {
      validators: [Validators.min(1)],
      nonNullable: true,
    }),
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
    estado: new FormControl<boolean>(false, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  hasLoaded = false;

  constructor() {
    effect(() => {
      if (this.ubigeoStore.isOpenEdit() && !this.hasLoaded) {
        this.loadEntityForEdit();
        this.hasLoaded = true;
      }
    });
  }

  loadEntityForEdit() {
    //Carga datos de la tabla
    var entity = this.ubigeoStore.entityEdit();
    if (entity) {
      this.FormUbigeoUpdate.patchValue(entity);
    }
  }

  onCloseModalEdit() {
    this.ubigeoStore.closeModalEdit();
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
        this.ubigeoStore.setSubmitting(true);
         const values = this.FormUbigeoUpdate.getRawValue();
      this.ubigeoService.update(values as DtoUbigeoEdit).subscribe({
          next: (response) => {
            this.ubigeoStore.setSubmitting(false);
            this.onCloseModalEdit();
            this.helperStore.showToast({ severity: 'success', summary: 'Ubigeo actualizado', detail: response.message });
            this.ubigeoStore.doList();
          },
          error: (error) => {
            this.ubigeoStore.setSubmitting(false);
            this.helperStore.showToast({ severity: 'error', summary: 'Error', detail: error.error.message });
          },
        });
      } else {
        console.log(getErrosOnControls(this.FormUbigeoUpdate));
        this.helperStore.showToast({ severity: 'error', summary: 'Error', detail: 'Complete los campos requeridos' });
      }
    }
}
