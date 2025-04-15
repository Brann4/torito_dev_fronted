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
import {TipoCuentaStore} from '@/stores/system/TipoCuentaStore';
import {TipoCuentaService} from '@/app/services/system/mantenimiento/tipo-cuenta/tipo-cuenta.service';
import {DtoTipoCuentaEdit} from '@/app/domain/dtos/system/tipo-cuenta/DtoTipoCuentaEdit';
import { AuthStore } from '@/stores/AuthStore';

@Component({
  selector: 'app-tipo-cuenta-edit',
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
  templateUrl: './tipo-cuenta-edit.component.html',
  styleUrl: './tipo-cuenta-edit.component.css'
})
export class TipoCuentaEditComponent {
  authStore = inject(AuthStore);
  tipoCuentaStore = inject(TipoCuentaStore);
  tipoCuentaService = inject(TipoCuentaService);
  helperStore = inject(HelperStore);
  formBuilder = inject(FormBuilder);

  FormTipoCuentaUpdate = this.formBuilder.group({
    id_tipo_cuenta: new FormControl<number>(0, {
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
      if (this.tipoCuentaStore.isOpenEdit() && !this.hasLoaded) {
        this.loadEntityForEdit();
        this.hasLoaded = true;
      }
    });
  }

  loadEntityForEdit() {
    var entity = this.tipoCuentaStore.entityEdit();
    if (entity) {
      this.FormTipoCuentaUpdate.patchValue({
        ...entity,
        usuario_modificacion: Number(this.authStore.getUserId()),
      });
    }
  }

  onCloseModalEdit() {
    this.tipoCuentaStore.closeModalEdit();
    this.FormTipoCuentaUpdate.reset({
      usuario_modificacion: Number(this.authStore.getUserId()),
    });
    this.hasLoaded = false;
  }

  getErrorMessageEdit(controlName: string): string {
    const control = this.FormTipoCuentaUpdate.get(controlName as string);
    return getErrorByKey(controlName, control);
  }

  handleSubmit() {
    this.FormTipoCuentaUpdate.markAllAsTouched();
    if (this.FormTipoCuentaUpdate.valid) {

      this.tipoCuentaStore.setSubmitting(true);
      const values = this.FormTipoCuentaUpdate.getRawValue() as DtoTipoCuentaEdit;
      this.tipoCuentaService.update(values).subscribe({
        next: (response) => {
          this.tipoCuentaStore.setSubmitting(false);
          this.onCloseModalEdit();
          this.helperStore.showToast({
            severity: 'success',
            summary: 'Tipo Cuenta actualizado',
            detail: response.message
          });
          this.tipoCuentaStore.doList();
        },
        error: (error) => {
          this.tipoCuentaStore.setSubmitting(false);
          this.helperStore.showToast({severity: 'error', summary: 'Error', detail: error.error.message});
        },
      });
    } else {
      console.log(getErrosOnControls(this.FormTipoCuentaUpdate));
      this.helperStore.showToast({severity: 'error', summary: 'Error', detail: 'Complete los campos requeridos'});
    }
  }
}
