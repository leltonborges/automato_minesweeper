import { Injectable } from '@angular/core';
import { CellComponent } from '../../components/minefield/cell/cell.component';
import { Neighbor, NEIGHBORS } from '../../core/interface/neighbor';

@Injectable({
              providedIn: 'root'
            })
export class MoveService {

  constructor() { }

  isEqualsCell(current: CellComponent,
               cell: CellComponent): boolean {
    if (current && cell) {
      return current.col === cell.col
             && current.row === cell.row;
    } else return false;
  }

  canMoveNeighbor(cell: CellComponent,
                  col: number,
                  row: number) {
    return NEIGHBORS.filter(this.checkCellMatch(cell, col, row)).length > 0;
  }

  private checkCellMatch(cell: CellComponent,
                         col: number,
                         row: number) {
    return (n: Neighbor) => this.isColumnMatch(cell, n, col)
                            && this.isRowMatch(cell, n, row);
  }

  private isRowMatch(cell: CellComponent,
                     n: Neighbor,
                     row: number) {
    return cell.row + n.row === row;
  }

  private isColumnMatch(cell: CellComponent,
                        n: Neighbor,
                        col: number) {
    return cell.col + n.column === col;
  }

}
