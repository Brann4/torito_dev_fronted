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
  DtoResponseEstadoWalletDetalle
} from '@/app/domain/dtos/system/estado-wallet-detalle/DtoResponseEstadoWalletDetalle';
import {
  EstadoWalletDetalleService
} from '@/app/services/system/mantenimiento/estado-wallet-detalle/estado-wallet-detalle.service';
import {EstadoWalletDetalleStore} from '@/stores/system/EstadoWalletDetalleStore';

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
    ContentHeaderComponent
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
      items: []
    }
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
}
