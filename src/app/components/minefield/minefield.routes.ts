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
          import('./board/board.component').then((mod) => mod.BoardComponent),
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
