import { ResolveFn } from '@angular/router';
import { MinefieldService } from '../../../service/minefield/minefield.service';
import { inject } from '@angular/core';

export const defaultBoardResolver: ResolveFn<String> = (route, state) => {
  const minefieldService = inject(MinefieldService);
  return minefieldService.getDefaultBoard();
};
