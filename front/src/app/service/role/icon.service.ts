import { Injectable } from '@angular/core';
import { ICONS_BOARD } from '../../core/interface/icon';
import { CellType } from '../../core/enum/CellType';

@Injectable({
              providedIn: 'root'
            })
export class IconService {

  constructor() { }

  boardIcon(cellType: CellType) {
    return ICONS_BOARD.get(cellType);
  }
}
