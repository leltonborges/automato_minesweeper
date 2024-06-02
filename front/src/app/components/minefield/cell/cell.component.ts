import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AnimationProp, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { IconService } from '../../../service/role/icon.service';
import { CellType } from '../../../core/enum/CellType';

@Component({
             selector: 'app-cell',
             standalone: true,
             imports: [FontAwesomeModule, CommonModule],
             templateUrl: './cell.component.html',
             styleUrl: './cell.component.sass'
           })
export class CellComponent
  implements OnInit {
  @Input({ alias: 'content', required: true })
  content!: CellType;
  @Input({ alias: 'row', required: true })
  row!: number;
  @Input({ alias: 'col', required: true })
  col!: number;
  @Input({ alias: 'mines' })
  mines: number = 0;
  @Input({ alias: 'hints' })
  hints: number = 0;
  @Input({ alias: 'blocks' })
  blocks: number = 0;
  @Input({ alias: 'action', required: true })
  isAction: boolean;
  @Input({ alias: 'start', required: true })
  isStart: boolean;

  @Output('cellClicked')
  cellClicked: EventEmitter<CellComponent>;

  private _icon!: IconProp;
  private _isRevealed: boolean;

  constructor(private iconService: IconService,
              library: FaIconLibrary) {
    library.addIconPacks(fas, far);
    this.isAction = false;
    this._isRevealed = false;
    this.cellClicked = new EventEmitter<CellComponent>();
    this.isStart = false;
  }

  get icon(): IconProp {
    return this._icon;
  }

  get isRevealed(): boolean {
    return this._isRevealed;
  }

  ngOnInit(): void {
    const cellIcon = this.iconService.boardIcon(this.content);
    if (cellIcon) this._icon = cellIcon;
    if (this.isStart) this.isAction = true;
  }

  public get isAnimation(): AnimationProp | undefined {
    return this.isAction ? 'fade' : undefined;
  }

  @HostListener('click')
  revealed() {
    this.cellClicked.emit(this);
  }

  toReveal() {
    this._isRevealed = true;
  }

  toRevealAndActive() {
    this._isRevealed = true;
    this.isAction = true;
  }

  noAction() {
    this.isAction = false;
  }
}
