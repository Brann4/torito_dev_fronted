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
import {EstadoConfirmacionStore} from '@/stores/system/EstadoConfirmacionStore';
import {
  DtoResponseEstadoConfirmacion
} from '@/app/domain/dtos/system/estado-confirmacion/DtoResponseEstadoConfirmacion';
import {
  EstadoConfirmacionService
} from '@/app/services/system/mantenimiento/estado-confirmacion/estado-confirmacion.service';
import {
  EstadoConfirmacionCreateComponent
} from '@/app/pages/system/estado-confirmacion/create/estado-confirmacion-create.component';
import {
  EstadoConfirmacionEditComponent
} from '@/app/pages/system/estado-confirmacion/edit/estado-confirmacion-edit.component';

@Component({
  selector: 'app-estado-confirmacion',
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
    EstadoConfirmacionCreateComponent,
    EstadoConfirmacionEditComponent
  ],
  templateUrl: './estado-confirmacion.component.html',
  styleUrl: './estado-confirmacion.component.css'
})
export class EstadoConfirmacionComponent {
  breadcrumbs = [{label: 'Estado Confirmacion'}];
  helperStore = inject(HelperStore);
  estadoConfirmacionStore = inject(EstadoConfirmacionStore);
  estadoConfirmacionService = inject(EstadoConfirmacionService);
  confirmationService = inject(ConfirmationService);

  selectedRow = signal<DtoResponseEstadoConfirmacion | null>(null);
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
    this.loadTableEstadoConfirmacion()
  }

  onSuccessCreate() {
    console.log("onSuccessCreate");
    this.loadTableEstadoConfirmacion()
  }

  loadTableEstadoConfirmacion() {
    this.estadoConfirmacionStore.doList();
  }

  onOpenModalCreateEstadoConfirmacion() {
    this.estadoConfirmacionStore.openModalCreate()
  }

  onOpenMenuOptionsRowTable(event: MouseEvent, menu: any, row: any) {
    this.selectedRow.update(() => row)
    menu.toggle(event)
  }

  onEdit(estadoConfirmacionEdit: DtoResponseEstadoConfirmacion | null) {
    if (estadoConfirmacionEdit) {
      this.estadoConfirmacionStore.openModalEdit(estadoConfirmacionEdit);
    }
  }

  onDelete(entity: DtoResponseEstadoConfirmacion | null) {
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
          this.estadoConfirmacionService.delete(entity.id_estado_confirmacion).subscribe({
            next: (response) => {
              this.estadoConfirmacionStore.doList();
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
      console.warn('El ubigeo para eliminar no esta seleccionado');
    }
  }

}
