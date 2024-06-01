import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CellType } from '../enum/CellType';

export type Icons = Map<CellType, IconProp>

const map = new Map<CellType, IconProp>();

map.set(CellType.Free, ['fas', 'box-open']);
map.set(CellType.Mine, ['fas', 'bomb']);
map.set(CellType.Block, ['fas', 'road-barrier']);
map.set(CellType.Hint, ['fas', 'face-laugh-squint']);
map.set(CellType.Treasure, ['fas', 'gifts']);

export const ICONS_BOARD: Icons = map;
