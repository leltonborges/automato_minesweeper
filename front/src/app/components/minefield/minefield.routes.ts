import { Routes } from '@angular/router';

export const minefieldRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'play',
      },
      {
        path: 'play',
        loadComponent: () =>
          import('./play/play.component').then((mod) => mod.PlayComponent),
      },
      {
        path: 'tree',
        loadComponent: () =>
          import('./tree/tree.component').then((mod) => mod.TreeComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings.component').then((mod) => mod.SettingsComponent),
      },
    ],
  },
];
