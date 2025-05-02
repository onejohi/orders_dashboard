import { Routes } from '@angular/router';
import { DetailComponent } from './orders/detail/detail.component';
import { ListComponent } from './orders/list/list.component';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'order/:id',
    component: DetailComponent,
  }
];

