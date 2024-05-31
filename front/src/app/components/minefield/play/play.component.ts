import { Component, Input } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { NotificationService } from '../../../service/role/notification.service';
import { MoveService } from '../../../service/role/move.service';

@Component({
             selector: 'app-play',
             standalone: true,
             imports: [
               CellComponent
             ],
             templateUrl: './play.component.html',
             styleUrl: './play.component.sass'
           })
export class PlayComponent {
  private _cellComponent!: CellComponent;
  @Input() cols: number = 5;
  @Input() rows: number = 5;
  rowsArray: number[] = [];
  colsArray: number[] = [];

  constructor(private _notifyService: NotificationService,
              private _moveService: MoveService) {}

  cellClicked(cell: CellComponent) {
    if (this.isEqualsCell(cell)) {
      this._notifyService.notify('Sua posição já é esta!');
      return;
    }

    if (this._cellComponent) {
      this._cellComponent.noAction();
    }

    if (this.canTransact(cell)) {
      cell.toReveal();
      this._cellComponent = cell;
      this._notifyService.notify('Transação realizada!');
    } else this._notifyService.notify('Vizinhação invalida!');
  }

  private isEqualsCell(cell: CellComponent): boolean {
    return this._moveService.isEqualsCell(this._cellComponent, cell);
  }

  private canTransact(cell: CellComponent): boolean {
    if (this._cellComponent) {
      const col: number = this._cellComponent.col;
      const row: number = this._cellComponent.row;
      return this._moveService.canMove(cell, col, row);
    } else return true;
  }

  ngOnInit(): void {
    this.rowsArray = Array.from({ length: this.rows }, (_, i) => i);
    this.colsArray = Array.from({ length: this.cols }, (_, i) => i);
  }
}
