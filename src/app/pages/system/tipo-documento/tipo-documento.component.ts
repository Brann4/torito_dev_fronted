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
import {TipoDocumentoStore} from '@/stores/system/TipoDocumentoStore';
import {DtoResponseTipoDocumento} from '@/app/domain/dtos/system/tipo-documento/DtoResponseTipoDocumento';
import {TipoDocumentoService} from '@/app/services/system/mantenimiento/tipo-documento/tipo-documento.service';
import {TipoDocumentoCreateComponent} from '@/app/pages/system/tipo-documento/create/tipo-documento-create.component';
import {TipoDocumentoEditComponent} from '@/app/pages/system/tipo-documento/edit/tipo-documento-edit.component';

@Component({
  selector: 'app-tipo-documento',
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
    TipoDocumentoCreateComponent,
    TipoDocumentoEditComponent,
  ],
  templateUrl: './tipo-documento.component.html',
  styleUrl: './tipo-documento.component.css'
})
export class TipoDocumentoComponent {
  breadcrumbs = [{label: 'Tipo Documento'}];
  helperStore = inject(HelperStore);
  tipoDocumentoStore = inject(TipoDocumentoStore);
  tipoDocumentoService = inject(TipoDocumentoService);
  confirmationService = inject(ConfirmationService);

  selectedRow = signal<DtoResponseTipoDocumento | null>(null);
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
    this.loadTableTipoDocumento()
  }

  onSuccessCreate() {
    console.log("onSuccessCreate");
    this.loadTableTipoDocumento()
  }

  loadTableTipoDocumento() {
    this.tipoDocumentoStore.doList();
  }

  onOpenModalCreateTipoDocumento() {
    this.tipoDocumentoStore.openModalCreate()
  }

  onOpenMenuOptionsRowTable(event: MouseEvent, menu: any, row: any) {
    this.selectedRow.update(() => row)
    menu.toggle(event)
  }

  onEdit(tipoDocumentoEdit: DtoResponseTipoDocumento | null) {
    if (tipoDocumentoEdit) {
      this.tipoDocumentoStore.openModalEdit(tipoDocumentoEdit);
    }
  }

  onDelete(entity: DtoResponseTipoDocumento | null) {
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
          this.tipoDocumentoService.delete(entity.id_tipo_documento).subscribe({
            next: (response) => {
              this.tipoDocumentoStore.doList();
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
      console.warn('El Tipo Documento para eliminar no esta seleccionado');
    }
  }
}
