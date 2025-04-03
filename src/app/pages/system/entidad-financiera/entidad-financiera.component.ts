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
import {DtoResponseEntidadFinanciera} from '@/app/domain/dtos/system/entidad-financiera/DtoResponseEntidadFinanciera';
import {
  EntidadFinancieraService
} from '@/app/services/system/mantenimiento/entidad-financiera/entidad-financiera.service';
import {EntidadFinancieraStore} from '@/stores/system/EntidadFinancieraStore';
import { TagModule } from 'primeng/tag';
import { EntidadFinancieraCreateComponent } from "./create/entidad-financiera-create.component";

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
    EntidadFinancieraCreateComponent
],
  templateUrl: './entidad-financiera.component.html',
  styleUrl: './entidad-financiera.component.css'
})
export class EntidadFinancieraComponent {
  breadcrumbs = [{label: 'Entidad Financiera'}];
  helperStore = inject(HelperStore);
  entidadFinancieraStore = inject(EntidadFinancieraStore);
  entidadFinancieraService = inject(EntidadFinancieraService);
  confirmationService = inject(ConfirmationService);

  selectedRow = signal<DtoResponseEntidadFinanciera | null>(null);
  options = signal([
    {
      label: 'Opciones',
      items: []
    }
  ]);

  constructor() {
    this.loadTableEntidadFinanciera()
  }

  onSuccessCreate() {
    console.log("onSuccessCreate");
    this.loadTableEntidadFinanciera()
  }

  loadTableEntidadFinanciera() {
    this.entidadFinancieraStore.doList();
  }

  onOpenModalCreateEntidadFinanciera() {
    this.entidadFinancieraStore.openModalCreate()
  }

  onOpenMenuOptionsRowTable(event: MouseEvent, menu: any, row: any) {
    this.selectedRow.update(() => row)
    menu.toggle(event)
  }

}

