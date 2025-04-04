import {Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";
import {SystemLayoutComponent} from "./system-layout/system-layout.component";
import {UserComponent} from "./user/user.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UbigeoComponent} from "./ubigeo/ubigeo.component";
import {TipoDocumentoComponent} from '@/app/pages/system/tipo-documento/tipo-documento.component';
import {TipoCuentaComponent} from '@/app/pages/system/tipo-cuenta/tipo-cuenta.component';
import {EstadoWalletDetalleComponent} from '@/app/pages/system/estado-wallet-detalle/estado-wallet-detalle.component';
import {EstadoConfirmacionComponent} from '@/app/pages/system/estado-confirmacion/estado-confirmacion.component';
import {EntidadFinancieraComponent} from '@/app/pages/system/entidad-financiera/entidad-financiera.component';
import {RolComponent} from '@/app/pages/system/rol/rol.component';

export const SYSTEM_ROUTES: Routes = [

  {
    path: '', component: SystemLayoutComponent, children: [
      {path: '', redirectTo: 'bienvenido', pathMatch: 'full'},
      {path: 'bienvenido', component: WelcomeComponent},
      {path: 'usuarios', component: UserComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'ubigeo', component: UbigeoComponent},
      {path: 'tipo-documento', component: TipoDocumentoComponent},
      {path: 'tipo-cuenta', component: TipoCuentaComponent},
      {path: 'estado-detalle-wallet', component: EstadoWalletDetalleComponent},
      {path: 'estados-confirmacion', component: EstadoConfirmacionComponent},
      {path: 'entidad-financiera', component: EntidadFinancieraComponent},
      {path: 'rol', component: RolComponent},
    ],
    // canActivate: [
    //     authGuard
    // ]
  },
];
