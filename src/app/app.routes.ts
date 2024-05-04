import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const mainRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  }
];
