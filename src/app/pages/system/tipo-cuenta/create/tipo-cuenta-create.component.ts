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
import {TipoCuentaStore} from '@/stores/system/TipoCuentaStore';
import {TipoCuentaService} from '@/app/services/system/mantenimiento/tipo-cuenta/tipo-cuenta.service';
import {DtoTipoDocumentoCreate} from '@/app/domain/dtos/system/tipo-documento/DtoTipoDocumentoCreate';

@Component({
  selector: 'app-tipo-cuenta-create',
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
  templateUrl: './tipo-cuenta-create.component.html',
  styleUrl: './tipo-cuenta-create.component.css'
})
export class TipoCuentaCreateComponent implements OnInit {
  tipoCuentaStore = inject(TipoCuentaStore);
  tipoCuentaService = inject(TipoCuentaService);
  helperStore = inject(HelperStore);
  formBuilder = inject(FormBuilder);
  isActive!: boolean;

  FormTipoCuentaCreate = this.formBuilder.group({
    descripcion: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true,
    }),
    estado: new FormControl<boolean>(false, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  isSubmitting = signal<boolean>(false);

  ngOnInit(): void {
  }

  onCloseModalCreate() {
    this.tipoCuentaStore.closeModalCreate();
    this.FormTipoCuentaCreate.reset();
  }

  getErrorMessageOnCreate(controlName: string): string {
    const control = this.FormTipoCuentaCreate.get(controlName as string);
    return getErrorByKey(controlName, control);
  }

  handleSubmit() {
    this.FormTipoCuentaCreate.markAllAsTouched();

    if (this.FormTipoCuentaCreate.valid) {
      this.isSubmitting.set(true);
      const selectedValues = this.FormTipoCuentaCreate.getRawValue();

      this.tipoCuentaService.store(selectedValues as DtoTipoDocumentoCreate).subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          this.onCloseModalCreate();
          this.helperStore.showToast({
            severity: 'success',
            summary: 'Tipo Cuenta registrado',
            detail: response.message,
          });
          this.tipoCuentaStore.doList();
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
