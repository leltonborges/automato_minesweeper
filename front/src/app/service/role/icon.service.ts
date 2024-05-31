import { Injectable } from '@angular/core';
import { ICONS_BOARD } from '../../core/interface/icon';

@Injectable({
              providedIn: 'root'
            })
export class IconService {

  constructor() { }

  boardIcon(key: string) {
    return ICONS_BOARD.get(key);
  }
}
