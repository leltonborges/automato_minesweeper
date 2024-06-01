import { Cell, MatrixCell } from './cell';
import { Config } from './config';
import { Timer } from './timer';

export interface Board {
  grid: MatrixCell
  current: Cell
  steps: number,
  paths: Array<Cell>
  config: Config
  timer: Timer
}
