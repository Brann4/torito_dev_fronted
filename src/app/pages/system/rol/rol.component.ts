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
import {RolStore} from '@/stores/system/RolStore';
import {DtoResponseRol} from '@/app/domain/dtos/system/rol/DtoResponseRol';
import {RolService} from '@/app/services/system/mantenimiento/rol/rol.service';
import {RolCreateComponent} from '@/app/pages/system/rol/create/rol-create.component';
import {RolEditComponent} from '@/app/pages/system/rol/edit/rol-edit.component';

@Component({
  selector: 'app-rol',
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
    RolCreateComponent,
    RolEditComponent,
  ],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css'
})
export class RolComponent {
  breadcrumbs = [{label: 'Rol'}];
  helperStore = inject(HelperStore);
  rolStore = inject(RolStore);
  rolService = inject(RolService);
  confirmationService = inject(ConfirmationService);

  selectedRow = signal<DtoResponseRol | null>(null);
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
    this.loadTableRol()
  }

  onSuccessCreate() {
    console.log("onSuccessCreate");
    this.loadTableRol()
  }

  loadTableRol() {
    this.rolStore.doList();
  }

  onOpenModalCreateRol() {
    this.rolStore.openModalCreate()
  }

  onOpenMenuOptionsRowTable(event: MouseEvent, menu: any, row: any) {
    this.selectedRow.update(() => row)
    menu.toggle(event)
  }

  onEdit(rolEdit: DtoResponseRol | null) {
    if (rolEdit) {
      this.rolStore.openModalEdit(rolEdit);
    }
  }

  onDelete(entity: DtoResponseRol | null) {
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
          this.rolService.delete(entity.id_rol).subscribe({
            next: (response) => {
              this.rolStore.doList();
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
      console.warn('El Rol para eliminar no esta seleccionado');
    }
  }
}
