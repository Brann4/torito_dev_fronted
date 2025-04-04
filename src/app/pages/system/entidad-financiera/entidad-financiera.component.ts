import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { ContentHeaderComponent } from '@/app/components/content-header/content-header.component';
import { ConfirmationService } from 'primeng/api';
import { HelperStore } from '@/stores/HelpersStore';
import { DtoResponseEntidadFinanciera } from '@/app/domain/dtos/system/entidad-financiera/DtoResponseEntidadFinanciera';
import { EntidadFinancieraService } from '@/app/services/system/mantenimiento/entidad-financiera/entidad-financiera.service';
import { EntidadFinancieraStore } from '@/stores/system/EntidadFinancieraStore';
import { TagModule } from 'primeng/tag';
import { EntidadFinancieraCreateComponent } from './create/entidad-financiera-create.component';
import { EntidadFinancieraEditComponent } from './edit/entidad-financiera-edit.component';
import { Image } from 'primeng/image';
import { environment } from '@/environments/environment.development';
import { DtoEntidadFinancieraEdit } from '@/app/domain/dtos/system/entidad-financiera/DtoEntidadFinancieraEdit';

@Component({
  selector: 'app-entidad-financiera',
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
    EntidadFinancieraCreateComponent,
    EntidadFinancieraEditComponent,
    Image,
  ],
  templateUrl: './entidad-financiera.component.html',
  styleUrl: './entidad-financiera.component.css',
})
export class EntidadFinancieraComponent {
  baseimageURL = environment.imageService;
  breadcrumbs = [{ label: 'Entidad Financiera' }];
  helperStore = inject(HelperStore);
  entidadFinancieraStore = inject(EntidadFinancieraStore);
  entidadFinancieraService = inject(EntidadFinancieraService);
  confirmationService = inject(ConfirmationService);

  selectedRow = signal<DtoResponseEntidadFinanciera | null>(null);
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
    this.loadTableEntidadFinanciera();
  }

  getImageUrl(imageName: string): string {
    return `${this.baseimageURL}/${imageName}`;
  }

  onSuccessCreate() {
    console.log('onSuccessCreate');
    this.loadTableEntidadFinanciera();
  }

  loadTableEntidadFinanciera() {
    this.entidadFinancieraStore.doList();
  }

  onOpenModalCreateEntidadFinanciera() {
    this.entidadFinancieraStore.openModalCreate();
  }

  onOpenMenuOptionsRowTable(event: MouseEvent, menu: any, row: any) {
    this.selectedRow.update(() => row);
    menu.toggle(event);
  }

  onEdit(entidadFinancieraEdit: DtoResponseEntidadFinanciera | null) {
    if (entidadFinancieraEdit) {
      this.entidadFinancieraStore.openModalEdit(entidadFinancieraEdit);
    }
  }
   onDelete(entity: DtoResponseEntidadFinanciera | null) {
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
            this.entidadFinancieraService.delete(entity.id_entidad_financiera).subscribe({
              next: (response) => {
                this.entidadFinancieraStore.doList();
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
        console.warn('La Entidad Financiera para eliminar no esta seleccionado');
      }
    }

}
