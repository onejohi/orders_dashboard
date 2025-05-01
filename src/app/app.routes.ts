import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full',
  },
  {
    path: 'orders',
    loadComponent: () => import('./orders/list/list.component').then(m => m.ListComponent),
  },
  {
    path: 'order/:id',
    loadComponent: () => import('./orders/detail/detail.component').then(m => m.DetailComponent),
  }
];

