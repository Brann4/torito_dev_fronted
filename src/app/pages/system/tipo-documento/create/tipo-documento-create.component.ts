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
import {TipoDocumentoStore} from '@/stores/system/TipoDocumentoStore';
import {TipoDocumentoService} from '@/app/services/system/mantenimiento/tipo-documento/tipo-documento.service';
import {DtoTipoDocumentoCreate} from '@/app/domain/dtos/system/tipo-documento/DtoTipoDocumentoCreate';

@Component({
  selector: 'app-tipo-documento-create',
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
  templateUrl: './tipo-documento-create.component.html',
  styleUrl: './tipo-documento-create.component.css'
})
export class TipoDocumentoCreateComponent implements OnInit {
  tipoDocumentoStore = inject(TipoDocumentoStore);
  tipoDocumentoService = inject(TipoDocumentoService);
  helperStore = inject(HelperStore);
  formBuilder = inject(FormBuilder);
  isActive!: boolean;

  FormTipoDocumentoCreate = this.formBuilder.group({
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
    this.tipoDocumentoStore.closeModalCreate();
    this.FormTipoDocumentoCreate.reset();
  }

  getErrorMessageOnCreate(controlName: string): string {
    const control = this.FormTipoDocumentoCreate.get(controlName as string);
    return getErrorByKey(controlName, control);
  }

  handleSubmit() {
    this.FormTipoDocumentoCreate.markAllAsTouched();

    if (this.FormTipoDocumentoCreate.valid) {
      this.isSubmitting.set(true);
      const selectedValues = this.FormTipoDocumentoCreate.getRawValue();

      this.tipoDocumentoService.store(selectedValues as DtoTipoDocumentoCreate).subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          this.onCloseModalCreate();
          this.helperStore.showToast({
            severity: 'success',
            summary: 'Tipo Documento registrado',
            detail: response.message,
          });
          this.tipoDocumentoStore.doList();
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
