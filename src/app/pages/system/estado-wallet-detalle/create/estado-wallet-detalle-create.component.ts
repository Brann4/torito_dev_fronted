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
import {EstadoWalletDetalleStore} from '@/stores/system/EstadoWalletDetalleStore';
import {
  EstadoWalletDetalleService
} from '@/app/services/system/mantenimiento/estado-wallet-detalle/estado-wallet-detalle.service';
import {
  DtoEstadoWalletDetalleCreate
} from '@/app/domain/dtos/system/estado-wallet-detalle/DtoEstadoWalletDetalleCreate';
import { AuthStore } from '@/stores/AuthStore';

@Component({
  selector: 'app-estado-wallet-detalle-create',
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
  templateUrl: './estado-wallet-detalle-create.component.html',
  styleUrl: './estado-wallet-detalle-create.component.css'
})
export class EstadoWalletDetalleCreateComponent implements OnInit {
  helperStore = inject(HelperStore);
  estadoWalletDetalleStore = inject(EstadoWalletDetalleStore);
  estadoWalletDetalleService = inject(EstadoWalletDetalleService);
  formBuilder = inject(FormBuilder);
  isActive!: boolean;
  authStore = inject(AuthStore);

  FormEstadoWalletDetalleCreate = this.formBuilder.group({
    descripcion: new FormControl<string>('', {
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

  ngOnInit(): void {
  }

  onCloseModalCreate() {
    this.estadoWalletDetalleStore.closeModalCreate();
    this.FormEstadoWalletDetalleCreate.reset();
  }

  getErrorMessageOnCreate(controlName: string): string {
    const control = this.FormEstadoWalletDetalleCreate.get(controlName as string);
    return getErrorByKey(controlName, control);
  }

  handleSubmit() {
    this.FormEstadoWalletDetalleCreate.markAllAsTouched();

    if (this.FormEstadoWalletDetalleCreate.valid) {
      this.isSubmitting.set(true);
      const selectedValues = this.FormEstadoWalletDetalleCreate.getRawValue();

      this.estadoWalletDetalleService.store(selectedValues as DtoEstadoWalletDetalleCreate).subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          this.onCloseModalCreate();
          this.helperStore.showToast({
            severity: 'success',
            summary: 'Estado Wallet Detalle registrado',
            detail: response.message,
          });
          this.estadoWalletDetalleStore.doList();
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
