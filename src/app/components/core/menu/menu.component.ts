import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.sass',
})
export class MenuComponent {
  private _isMenuOpen: boolean;

  constructor() {
    this._isMenuOpen = false;
  }

  get isMenuOpen(): boolean {
    return this._isMenuOpen;
  }

  @Input('toggle')
  set isMenuOpen(value: boolean) {
    this._isMenuOpen = value;
  }

  chargeStatusMenu(): void {
    this._isMenuOpen = !this._isMenuOpen;
    console.log(`Is: ${ this.isMenuOpen }`);
  }
}
