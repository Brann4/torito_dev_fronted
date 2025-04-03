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
import {TipoDocumentoStore} from '@/stores/system/TipoDocumentoStore';
import {DtoResponseTipoDocumento} from '@/app/domain/dtos/system/tipo-documento/DtoResponseTipoDocumento';
import {TipoDocumentoService} from '@/app/services/system/mantenimiento/tipodocumento/tipo-documento.service';

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
    ContentHeaderComponent
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
      items: []
    }
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
}
