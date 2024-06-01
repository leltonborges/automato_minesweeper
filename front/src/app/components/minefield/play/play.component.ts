import { Component, Input, OnInit } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { NotificationService } from '../../../service/role/notification.service';
import { MoveService } from '../../../service/role/move.service';
import { Board } from '../../../core/interface/minefield/board';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
             selector: 'app-play',
             standalone: true,
             imports: [
               CellComponent,
               HttpClientModule
             ],
             templateUrl: './play.component.html',
             styleUrl: './play.component.sass'
           })
export class PlayComponent
  implements OnInit {
  private _cellComponent!: CellComponent;
  @Input() cols: number = 5;
  @Input() rows: number = 5;
  rowsArray: number[] = [];
  colsArray: number[] = [];
  private _board!: Board;

  constructor(private _notifyService: NotificationService,
              private _moveService: MoveService,
              private _activatedRoute: ActivatedRoute) {
  }

  cellClicked(cell: CellComponent) {
    if (this.isEqualsCell(cell)) {
      this._notifyService.notify('Sua posição já é esta!');

    } else {

      if (this.canTransact(cell)) {
        if (this._cellComponent) this._cellComponent.noAction();

        cell.toReveal();
        this._cellComponent = cell;
        this._notifyService.notify('Transação realizada!');
      } else this._notifyService.notify('Vizinhação invalida!');
    }
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

  get board(): Board {
    return this._board;
  }

  ngOnInit(): void {
    this.rowsArray = Array.from({ length: this.rows }, (_, i) => i);
    this.colsArray = Array.from({ length: this.cols }, (_, i) => i);

    this._activatedRoute.data.subscribe(({ board }) => {
      this._board = board;
    });
  }
}
