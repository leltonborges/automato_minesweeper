import { CellType } from '../../enum/CellType';

export interface Cell {
  content: CellType,
  row: number,
  col: number,
  revealed: boolean,
  cell_num_mines: number,
  cell_num_hints: number,
  cell_num_block: number,
  isStart: boolean,
  neighbors: Array<Cell>
}

export type Cells = Array<Cell>;

export type MatrixCell = Array<Cells>;
