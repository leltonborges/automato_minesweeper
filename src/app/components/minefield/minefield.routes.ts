import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';

export const minefieldRoutes: Routes = [
  {
    path: 'minefield',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'play',
      },
      {
      path: 'play',
      component: BoardComponent
    }]
  },
];
