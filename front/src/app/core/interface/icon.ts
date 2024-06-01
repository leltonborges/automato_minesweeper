import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type Icons = Map<string, IconProp>

const map = new Map<string, IconProp>();

map.set('Free', ['fas', 'box-open']);
map.set('Mine', ['fas', 'bomb']);
map.set('Block', ['fas', 'road-barrier']);
map.set('Treasure', ['fas', 'gifts']);

export const ICONS_BOARD: Icons = map;
