import { Component, HostListener, Input, Renderer2 } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AnimationProp, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
             selector: 'app-cell',
             standalone: true,
             imports: [FontAwesomeModule, CommonModule],
             templateUrl: './cell.component.html',
             styleUrl: './cell.component.sass'
           })
export class CellComponent {
  @Input({ alias: 'content', required: true })
  content!: string;
  @Input({ alias: 'icon', required: true })
  icon!: IconProp;
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

  constructor(private renderer: Renderer2,
              library: FaIconLibrary) {
    library.addIconPacks(fas, far);
    this._isAction = false;
    this._isRevealed = false;
  }

  private _isAction: boolean;

  get isAction(): boolean {
    return this._isAction;
  }

  private _isRevealed: boolean;

  get isRevealed(): boolean {
    return this._isRevealed;
  }

  public get isAnimation(): AnimationProp | undefined {
    return this._isAction ? 'fade' : undefined;
  }

  @HostListener('click')
  revealed() {
    this._isAction = true;
    this._isRevealed = true;
  }

  toReveal() {
    this._isRevealed = true;
  }
}
