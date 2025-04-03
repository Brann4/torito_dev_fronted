import { Routes } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { SystemLayoutComponent } from "./system-layout/system-layout.component";
import { UserComponent } from "./user/user.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UbigeoComponent } from "./ubigeo/ubigeo.component";


export const SYSTEM_ROUTES: Routes = [
    {
        path:'',component: SystemLayoutComponent, children:[
            { path: '', redirectTo: 'bienvenido', pathMatch: 'full' },
            { path: 'bienvenido', component: WelcomeComponent },
            { path: 'usuarios', component: UserComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'ubigeo', component: UbigeoComponent},
        ],
    },
];
