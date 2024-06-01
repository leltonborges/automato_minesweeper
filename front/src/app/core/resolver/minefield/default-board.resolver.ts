import { ResolveFn } from '@angular/router';
import { MinefieldService } from '../../../service/minefield/minefield.service';
import { inject } from '@angular/core';
import { Board } from '../../interface/minefield/board';

export const defaultBoardResolver: ResolveFn<Board> = (route, state) => {
  const minefieldService = inject(MinefieldService);
  return minefieldService.getDefaultBoard();
};
