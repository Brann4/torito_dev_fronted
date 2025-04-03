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
import { UbigeoCreateComponent } from './create/ubigeo-create.component';
import { UbigeoEditComponent } from './edit/ubigeo-edit.component';
import { ConfirmationService } from 'primeng/api';
import { UbigeoService } from '@/app/services/system/mantenimiento/ubigeo/ubigeo.service';
import { HelperStore } from '@/stores/HelpersStore';
import { UbigeosStore } from '@/stores/system/UbigeoStore';
import { TagModule } from 'primeng/tag';
import { DtoResponseUbigeo } from '@/app/domain/dtos/system/ubigeo/DtoResponseUbigeo';

@Component({
  selector: 'app-ubigeo',
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
    UbigeoCreateComponent,
    UbigeoEditComponent,
    TagModule,
  ],
  templateUrl: './ubigeo.component.html',
  styleUrl: './ubigeo.component.css',
})
export class UbigeoComponent {
  breadcrumbs = [{ label: 'Ubigeos' }];
  helperStore = inject(HelperStore);
  ubigeoStore = inject(UbigeosStore);
  ubigeoService = inject(UbigeoService);
  confirmationService = inject(ConfirmationService);

  selectedRow = signal<DtoResponseUbigeo | null>(null);

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
    this.loadlTableUbigeos();
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'warning';
    }
  }
  
  onSuccessCreate() {
    console.log('onSuccessCreate');
    this.loadlTableUbigeos();
  }

  loadlTableUbigeos() {
    this.ubigeoStore.doList();
  }

  onOpenModalCreateUbigeo() {
    this.ubigeoStore.openModalCreate();
  }

  onEdit(ubigeoEdit: DtoResponseUbigeo | null) {
    if (ubigeoEdit) {
      this.ubigeoStore.openModalEdit(ubigeoEdit);
    }
  }

  onDelete(entity: DtoResponseUbigeo | null) {
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
          this.ubigeoService.delete(entity.id_ubigeo).subscribe({
            next: (response) => {
              this.ubigeoStore.doList();
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

  onOpenMenuOptionsRowTable(event: MouseEvent, menu: any, row: any) {
    this.selectedRow.update(() => row);
    menu.toggle(event);
  }
}
