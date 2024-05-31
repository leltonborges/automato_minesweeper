import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type Icons = Map<string, IconProp>

const map = new Map<string, IconProp>();

map.set('free', ['fas', 'box-open']);
map.set('mine', ['fas', 'bomb']);
map.set('block', ['fas', 'road-barrier']);
map.set('treasure', ['fas', 'gifts']);

export const ICONS_BOARD: Icons = map;
