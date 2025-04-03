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
import {
  DtoResponseEstadoConfirmacion
} from '@/app/domain/dtos/system/estado-confirmacion/DtoResponseEstadoConfirmacion';
import {
  EstadoConfirmacionService
} from '@/app/services/system/mantenimiento/estado-confirmacion/estado-confirmacion.service';
import {EstadoConfirmacionStore} from '@/stores/system/EstadoConfirmacionStore';
import { TagModule } from 'primeng/tag';

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
    TagModule
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
      items: []
    }
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
}
