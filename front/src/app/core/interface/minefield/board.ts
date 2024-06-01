import { Cell } from './cell';
import { Config } from './config';
import { Timer } from './timer';

export interface Board {
  grid: Array<Cell>
  current: Cell
  steps: number,
  paths: Array<Cell>
  config: Config
  timer: Timer
}
