import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [],
  templateUrl: './play.component.html',
  styleUrl: './play.component.sass'
})
export class PlayComponent {
  @Input() cols: number = 5;
  @Input() rows: number = 5;
  rowsArray: number[] = [];
  colsArray: number[] = [];

  constructor() {}

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
