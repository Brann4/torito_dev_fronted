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
import {DtoResponseTipoCuenta} from '@/app/domain/dtos/system/tipo-cuenta/DtoResponseTipoCuenta';
import {TipoCuentaService} from '@/app/services/system/mantenimiento/tipo-cuenta/tipo-cuenta.service';
import {TipoCuentaStore} from '@/stores/system/TipoCuentaStore';

@Component({
  selector: 'app-tipo-cuenta',
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
  templateUrl: './tipo-cuenta.component.html',
  styleUrl: './tipo-cuenta.component.css'
})
export class TipoCuentaComponent {

  breadcrumbs = [{label: 'Tipo Documento'}];
  helperStore = inject(HelperStore);
  tipoCuentaStore = inject(TipoCuentaStore);
  tipoCuentaService = inject(TipoCuentaService);
  confirmationService = inject(ConfirmationService);

  selectedRow = signal<DtoResponseTipoCuenta | null>(null);
  options = signal([
    {
      label: 'Opciones',
      items: []
    }
  ]);

  constructor() {
    this.loadTableTipoCuenta()
  }

  onSuccessCreate() {
    console.log("onSuccessCreate");
    this.loadTableTipoCuenta()
  }

  loadTableTipoCuenta() {
    this.tipoCuentaStore.doList();
  }

  onOpenModalCreateTipoCuenta() {
    this.tipoCuentaStore.openModalCreate()
  }

  onOpenMenuOptionsRowTable(event: MouseEvent, menu: any, row: any) {
    this.selectedRow.update(() => row)
    menu.toggle(event)
  }
}
