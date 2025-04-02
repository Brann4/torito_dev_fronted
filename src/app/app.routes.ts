import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'', loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path:'system', loadChildren: () => import('./pages/system/system.routes').then(m => m.SYSTEM_ROUTES)
    },
    {
        path: '**', redirectTo: '/404'
    }
];
