import { Routes } from '@angular/router';
import { Listing } from './pages/listing/listing';
Listing;

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listing',
    pathMatch: 'full',
  },
  {
    path: 'listing',
    loadComponent: () => import('./pages/listing/listing').then((m) => m.Listing),
  },
];
