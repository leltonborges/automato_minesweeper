import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FaIconComponent, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { MenuComponent } from './components/core/menu/menu.component';

@Component({
             selector: 'app-root',
             standalone: true,
             imports: [
               RouterOutlet,
               MatIconModule,
               MatToolbarModule,
               MatSidenavModule,
               MatButtonModule,
               MenuComponent,
               FaIconComponent,
               FontAwesomeModule
             ],
             templateUrl: './app.component.html',
             styleUrl: './app.component.sass'
           })
export class AppComponent {
  private _isMenuOpen: boolean;


  constructor(library: FaIconLibrary) {
    this._isMenuOpen = false;
    library.addIconPacks(fas, far)
  }

  get isMenuOpen(): boolean {
    return this._isMenuOpen;
  }


  toggleResult(drawer: MatDrawer) {
    drawer.toggle()
          .then(t => this._isMenuOpen = t == 'open');
  }
}
