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
import {EstadoWalletDetalleStore} from '@/stores/system/EstadoWalletDetalleStore';
import {
  EstadoWalletDetalleService
} from '@/app/services/system/mantenimiento/estado-wallet-detalle/estado-wallet-detalle.service';
import {DtoEstadoWalletDetalleEdit} from '@/app/domain/dtos/system/estado-wallet-detalle/DtoEstadoWalletDetalleEdit';

@Component({
  selector: 'app-estado-wallet-detalle-edit',
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
  templateUrl: './estado-wallet-detalle-edit.component.html',
  styleUrl: './estado-wallet-detalle-edit.component.css'
})
export class EstadoWalletDetalleEditComponent {
  helperStore = inject(HelperStore);
  estadoWalletDetalleStore = inject(EstadoWalletDetalleStore);
  estadoWalletDetalleService = inject(EstadoWalletDetalleService);
  formBuilder = inject(FormBuilder);

  FormEstadoWalletDetalleUpdate = this.formBuilder.group({
    id_estado_wallet_detalle: new FormControl<number>(0, {
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
  });

  hasLoaded = false;

  constructor() {
    effect(() => {
      if (this.estadoWalletDetalleStore.isOpenEdit() && !this.hasLoaded) {
        this.loadEntityForEdit();
        this.hasLoaded = true;
      }
    });
  }

  loadEntityForEdit() {
    //Carga datos de la tabla
    var entity = this.estadoWalletDetalleStore.entityEdit();
    if (entity) {
      this.FormEstadoWalletDetalleUpdate.patchValue(entity);
    }
  }

  onCloseModalEdit() {
    this.estadoWalletDetalleStore.closeModalEdit();
    this.FormEstadoWalletDetalleUpdate.reset();
    this.hasLoaded = false;
  }

  getErrorMessageEdit(controlName: string): string {
    const control = this.FormEstadoWalletDetalleUpdate.get(controlName as string);
    return getErrorByKey(controlName, control);
  }

  handleSubmit() {
    this.FormEstadoWalletDetalleUpdate.markAllAsTouched();
    if (this.FormEstadoWalletDetalleUpdate.valid) {
      console.log('Formulario válido:', this.FormEstadoWalletDetalleUpdate.getRawValue());
      this.estadoWalletDetalleStore.setSubmitting(true);
      const values = this.FormEstadoWalletDetalleUpdate.getRawValue();
      this.estadoWalletDetalleService.update(values as DtoEstadoWalletDetalleEdit).subscribe({
        next: (response) => {
          this.estadoWalletDetalleStore.setSubmitting(false);
          this.onCloseModalEdit();
          this.helperStore.showToast({
            severity: 'success',
            summary: 'Estado Wallet Detalle actualizado',
            detail: response.message
          });
          this.estadoWalletDetalleStore.doList();
        },
        error: (error) => {
          this.estadoWalletDetalleStore.setSubmitting(false);
          this.helperStore.showToast({severity: 'error', summary: 'Error', detail: error.error.message});
        },
      });
    } else {
      console.log(getErrosOnControls(this.FormEstadoWalletDetalleUpdate));
      this.helperStore.showToast({severity: 'error', summary: 'Error', detail: 'Complete los campos requeridos'});
    }
  }
}
