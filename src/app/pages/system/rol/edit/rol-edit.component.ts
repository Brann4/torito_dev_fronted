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
import {RolStore} from '@/stores/system/RolStore';
import {RolService} from '@/app/services/system/mantenimiento/rol/rol.service';
import {DtoRolEdit} from '@/app/domain/dtos/system/rol/DtoRolEdit';

@Component({
  selector: 'app-rol-edit',
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
  templateUrl: './rol-edit.component.html',
  styleUrl: './rol-edit.component.css'
})
export class RolEditComponent {
  rolStore = inject(RolStore);
  rolService = inject(RolService);
  helperStore = inject(HelperStore);
  formBuilder = inject(FormBuilder);

  FormRolUpdate = this.formBuilder.group({
    id_rol: new FormControl<number>(0, {
      validators: [Validators.min(1)],
      nonNullable: true,
    }),
    nombre_rol: new FormControl<string>('', {
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
      if (this.rolStore.isOpenEdit() && !this.hasLoaded) {
        this.loadEntityForEdit();
        this.hasLoaded = true;
      }
    });
  }

  loadEntityForEdit() {
    //Carga datos de la tabla
    var entity = this.rolStore.entityEdit();
    if (entity) {
      this.FormRolUpdate.patchValue(entity);
    }
  }

  onCloseModalEdit() {
    this.rolStore.closeModalEdit();
    this.FormRolUpdate.reset();
    this.hasLoaded = false;
  }

  getErrorMessageEdit(controlName: string): string {
    const control = this.FormRolUpdate.get(controlName as string);
    return getErrorByKey(controlName, control);
  }

  handleSubmit() {
    this.FormRolUpdate.markAllAsTouched();
    if (this.FormRolUpdate.valid) {
      console.log('Formulario válido:', this.FormRolUpdate.getRawValue());
      this.rolStore.setSubmitting(true);
      const values = this.FormRolUpdate.getRawValue();
      this.rolService.update(values as DtoRolEdit).subscribe({
        next: (response) => {
          this.rolStore.setSubmitting(false);
          this.onCloseModalEdit();
          this.helperStore.showToast({
            severity: 'success',
            summary: 'Rol actualizado',
            detail: response.message
          });
          this.rolStore.doList();
        },
        error: (error) => {
          this.rolStore.setSubmitting(false);
          this.helperStore.showToast({severity: 'error', summary: 'Error', detail: error.error.message});
        },
      });
    } else {
      console.log(getErrosOnControls(this.FormRolUpdate));
      this.helperStore.showToast({severity: 'error', summary: 'Error', detail: 'Complete los campos requeridos'});
    }
  }
}
