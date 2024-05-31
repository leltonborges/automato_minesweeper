import { Component, Input } from '@angular/core';
import { CellComponent } from '../cell/cell.component';

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

  constructor() {}

  cellClicked(cell: CellComponent) {
    if (this._cellComponent) {
      this._cellComponent.noAction();
    }
    cell.toReveal();
    this._cellComponent = cell;
  }

  ngOnInit(): void {
    this.rowsArray = Array.from({ length: this.rows }, (_, i) => i);
    this.colsArray = Array.from({ length: this.cols }, (_, i) => i);
  }

  isDragging: boolean = false;

  onMouseDown(event: MouseEvent, positon: {row: number, col: number}) {
    this.isDragging = false
    console.log("Down");
  }


  onMouseUp(event: MouseEvent, positon: {row: number, col: number}) {
    this.isDragging = true;
    console.log("UP");
  }
}
