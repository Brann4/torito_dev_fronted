import {CommonModule} from '@angular/common';
import {Component, inject, signal} from '@angular/core';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {TableModule} from 'primeng/table';
import {InputIcon} from 'primeng/inputicon';
import {IconField} from 'primeng/iconfield';
import {ContentHeaderComponent} from '@/app/components/content-header/content-header.component';
import {ConfirmationService} from 'primeng/api';
import {HelperStore} from '@/stores/HelpersStore';
import {TagModule} from 'primeng/tag';
import {TipoCuentaStore} from '@/stores/system/TipoCuentaStore';
import {DtoResponseTipoCuenta} from '@/app/domain/dtos/system/tipo-cuenta/DtoResponseTipoCuenta';
import {TipoCuentaService} from '@/app/services/system/mantenimiento/tipo-cuenta/tipo-cuenta.service';
import {TipoCuentaCreateComponent} from '@/app/pages/system/tipo-cuenta/create/tipo-cuenta-create.component';
import {TipoCuentaEditComponent} from '@/app/pages/system/tipo-cuenta/edit/tipo-cuenta-edit.component';

@Component({
  selector: 'app-tipo-cuenta',
  imports: [
    TableModule,
    CommonModule,
    InputTextModule,
    BreadcrumbModule,
    CardModule,
    ButtonModule,
    MenuModule,
    IconField,
    InputIcon,
    ContentHeaderComponent,
    TagModule,
    TipoCuentaCreateComponent,
    TipoCuentaEditComponent,
  ],
  templateUrl: './tipo-cuenta.component.html',
  styleUrl: './tipo-cuenta.component.css'
})
export class TipoCuentaComponent {
  breadcrumbs = [{label: 'Tipo Cuenta'}];
  helperStore = inject(HelperStore);
  tipoCuentaStore = inject(TipoCuentaStore);
  tipoCuentaService = inject(TipoCuentaService);
  confirmationService = inject(ConfirmationService);

  selectedRow = signal<DtoResponseTipoCuenta | null>(null);
  options = signal([
    {
      label: 'Opciones',
      items: [
        {
          label: 'Editar',
          icon: 'pi pi-pen-to-square',
          command: () => {
            this.onEdit(this.selectedRow());
          },
        },
        {
          label: 'Eliminar',
          icon: 'pi pi-trash',
          command: () => {
            this.onDelete(this.selectedRow());
          },
        },
      ],
    },
  ]);

  constructor() {
    this.loadTableTipoCuenta()
  }

  onSuccessCreate() {
    console.log("onSuccessCreate");
    this.loadTableTipoCuenta()
  }

  loadTableTipoCuenta() {
    this.tipoCuentaStore.doList();
  }

  onOpenModalCreateTipoCuenta() {
    this.tipoCuentaStore.openModalCreate()
  }

  onOpenMenuOptionsRowTable(event: MouseEvent, menu: any, row: any) {
    this.selectedRow.update(() => row)
    menu.toggle(event)
  }

  onEdit(tipoCuentaEdit: DtoResponseTipoCuenta | null) {
    if (tipoCuentaEdit) {
      this.tipoCuentaStore.openModalEdit(tipoCuentaEdit);
    }
  }

  onDelete(entity: DtoResponseTipoCuenta | null) {
    if (entity) {
      this.confirmationService.confirm({
        message: '¿Estás seguro de que quieres continuar?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
          label: 'Cancelar',
          severity: 'secondary',
          outlined: true,
        },
        acceptButtonProps: {
          severity: 'danger',
          label: 'Eliminar',
        },
        acceptIcon: 'pi pi-check',
        rejectIcon: 'pi pi-times',
        rejectButtonStyleClass: 'p-button-text',
        accept: () => {
          this.tipoCuentaService.delete(entity.id_tipo_cuenta).subscribe({
            next: (response) => {
              this.tipoCuentaStore.doList();
              this.helperStore.showToast({
                severity: 'success',
                summary: 'Eliminado',
                detail: response.message,
              });
            },
            error: (error) => {
              console.error(error);
              this.helperStore.showToast({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar',
              });
            },
          });
        },
        reject: () => {
          this.helperStore.showToast({
            severity: 'warn',
            summary: 'Cancelado',
            detail: 'Ha cancelado la eliminación',
          });
        },
      });
    } else {
      console.warn('El Tipo Cuenta para eliminar no esta seleccionado');
    }
  }
}
