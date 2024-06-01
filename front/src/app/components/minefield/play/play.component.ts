import { Component, OnInit } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { NotificationService } from '../../../service/role/notification.service';
import { MoveService } from '../../../service/role/move.service';
import { Board } from '../../../core/interface/minefield/board';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CellType } from '../../../core/enum/CellType';
import { CommonModule } from '@angular/common';

@Component({
             selector: 'app-play',
             standalone: true,
             imports: [
               CellComponent,
               HttpClientModule,
               CommonModule
             ],
             templateUrl: './play.component.html',
             styleUrl: './play.component.sass'
           })
export class PlayComponent
  implements OnInit {
  private _cellComponent!: CellComponent;
  private _board!: Board;
  private _hasHint: boolean;

  constructor(private _notifyService: NotificationService,
              private _moveService: MoveService,
              private _activatedRoute: ActivatedRoute) {
    this._gamerOver = false;
    this._hasHint = false;
    this._isWinner = false;
  }

  private _gamerOver: boolean;

  get gamerOver(): boolean {
    return this._gamerOver;
  }

  private _isWinner: boolean;

  get isWinner(): boolean {
    return this._isWinner;
  }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(({ board }) => {
      this._board = board;
    });
  }

  cellClicked(cell: CellComponent) {
    if (this.isSameCellClickedAgain(cell)) {
      return;
    }

    if (this.isInvalidNeighbor(cell)) {
      return;
    }

    this.processCellAction(cell);
  }

  private isSameCellClickedAgain(cell: CellComponent): boolean {
    if (this.isEqualsCell(cell)) {
      this._notifyService.notify('Sua posição já é esta!');
      return true;
    }
    return false;
  }

  private isInvalidNeighbor(cell: CellComponent): boolean {
    if (!this.canTransactNeighbor(cell)) {
      this._notifyService.notify('Vizinhação invalida!');
      return true;
    }
    return false;
  }

  private processCellAction(cell: CellComponent) {
    if (this.isBlockCell(cell)) {
      cell.toReveal();
      this._notifyService.notify('Uma posição bloqueada encontrada!');
    } else {
      this._cellComponent && this._cellComponent.noAction();
      if (this.isHintCell(cell)) {
        this._hasHint = true;
        this._notifyService.notify('Você encontrou um ajuda!');
      } else if (this.isMineCell(cell)) {
        this.isLoserGame();
        this._notifyService.notify('Fim de jogo! Você perdeu');
      } else if (this.isTreasureCell(cell)) {
        this.isWinnerGame();
        this._notifyService.notify('Fim de jogo! Você ganhou');
      }
      this.finishTransaction(cell);
    }
  }

  private isLoserGame() {
    this._gamerOver = true;
    this._isWinner = false;
  }

  private isEqualsCell(cell: CellComponent): boolean {
    return this._moveService.isEqualsCell(this._cellComponent, cell);
  }

  private isWinnerGame() {
    this._gamerOver = true;
    this._isWinner = true;
  }

  private finishTransaction(cell: CellComponent) {
    cell.toRevealAndActive();
    this._cellComponent = cell;
  }

  private isMineCell(cell: CellComponent) {
    return cell.content === CellType.Mine;
  }

  private isTreasureCell(cell: CellComponent) {
    return cell.content === CellType.Treasure;
  }

  private isHintCell(cell: CellComponent) {
    return cell.content === CellType.Hint;
  }

  get board(): Board {
    return this._board;
  }

  private isBlockCell(cell: CellComponent) {
    return cell.content === CellType.Block;
  }

  private canTransactNeighbor(cell: CellComponent): boolean {
    if (this._cellComponent) {
      const col: number = this._cellComponent.col;
      const row: number = this._cellComponent.row;
      return this._moveService.canMoveNeighbor(cell, col, row);
    } else return true;
  }
}
