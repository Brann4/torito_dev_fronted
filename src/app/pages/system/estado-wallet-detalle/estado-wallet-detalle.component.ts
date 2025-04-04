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
import {EstadoWalletDetalleStore} from '@/stores/system/EstadoWalletDetalleStore';
import {
  DtoResponseEstadoWalletDetalle
} from '@/app/domain/dtos/system/estado-wallet-detalle/DtoResponseEstadoWalletDetalle';
import {
  EstadoWalletDetalleService
} from '@/app/services/system/mantenimiento/estado-wallet-detalle/estado-wallet-detalle.service';
import {
  EstadoWalletDetalleCreateComponent
} from '@/app/pages/system/estado-wallet-detalle/create/estado-wallet-detalle-create.component';
import {
  EstadoWalletDetalleEditComponent
} from '@/app/pages/system/estado-wallet-detalle/edit/estado-wallet-detalle-edit.component';

@Component({
  selector: 'app-estado-wallet-detalle',
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
    EstadoWalletDetalleCreateComponent,
    EstadoWalletDetalleEditComponent,
  ],
  templateUrl: './estado-wallet-detalle.component.html',
  styleUrl: './estado-wallet-detalle.component.css'
})
export class EstadoWalletDetalleComponent {
  breadcrumbs = [{label: 'Estado Wallet Detalle'}];
  helperStore = inject(HelperStore);
  estadoWalletDetalleStore = inject(EstadoWalletDetalleStore);
  estadoWalletDetalleService = inject(EstadoWalletDetalleService);
  confirmationService = inject(ConfirmationService);

  selectedRow = signal<DtoResponseEstadoWalletDetalle | null>(null);
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
    this.loadTableEstadoWalletDetalle()
  }

  onSuccessCreate() {
    console.log("onSuccessCreate");
    this.loadTableEstadoWalletDetalle()
  }

  loadTableEstadoWalletDetalle() {
    this.estadoWalletDetalleStore.doList();
  }

  onOpenModalCreateEstadoWalletDetalle() {
    this.estadoWalletDetalleStore.openModalCreate()
  }

  onOpenMenuOptionsRowTable(event: MouseEvent, menu: any, row: any) {
    this.selectedRow.update(() => row)
    menu.toggle(event)
  }

  onEdit(estadoWalletDetalleEdit: DtoResponseEstadoWalletDetalle | null) {
    if (estadoWalletDetalleEdit) {
      this.estadoWalletDetalleStore.openModalEdit(estadoWalletDetalleEdit);
    }
  }

  onDelete(entity: DtoResponseEstadoWalletDetalle | null) {
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
          this.estadoWalletDetalleService.delete(entity.id_estado_wallet_detalle).subscribe({
            next: (response) => {
              this.estadoWalletDetalleStore.doList();
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
      console.warn('El Estado Wallet Detalle para eliminar no esta seleccionado');
    }
  }
}
